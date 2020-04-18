require("dotenv-safe").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const typeorm = require("typeorm");
const routes = require("./routes");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const LocalStrategy = require("passport-local").Strategy;

// Configure Passport.js with Local Strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const User = typeorm.getRepository("User");
    User.createQueryBuilder()
      .where({ email })
      .addSelect("password", "User_password")
      .getOne()
      .then((user) => {
        // Find User by Email
        if (!user) {
          return done(null, false, {
            error: "Invalid credentials. Try again.",
          });
        }
        // Validate Password
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, {
            error: "Invalid credentials. Try again.",
          });
        }
        // Check if Deactivated
        if (!user.enabled) {
          done(null, false, { error: "Account disabled." });
        }
        delete user.password, user.enabled;
        return done(null, user);
      })
      .catch((error) => done(error));
  })
);

// Tell Passport How to Serialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Tell Passport How to Deserialize User
passport.deserializeUser((id, done) => {
  const User = typeorm.getRepository("User");
  User.findOne(id)
    .then((user) => done(null, user))
    .catch((error) => done(error, false));
});

// Express App
const app = express();
const { PORT, DATABASE_URL, NODE_ENV } = process.env;
const EntitySchema = typeorm.EntitySchema;
app.disable("x-powered-by");

// API Middleware
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    genid: (req) => {
      return v4();
    },
    store: false,
    secret: "keyboard cat",
    cookie: { maxAge: 7 * 24 * 3600000 },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api", routes);

// In Production, serve React build
if (process.env.NODE_ENV === "production") {
  // Serve Static Files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React Routing: Return all Requests to React
  app.get("*", function (_, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Create Server
const server = http.createServer(app);

const main = async () => {
  // Connect to Database
  typeorm
    .createConnection({
      url: DATABASE_URL,
      type: "postgres",
      entities: [new EntitySchema(require("./entities/User"))],
      synchronize: false,
      logging: NODE_ENV !== "production" ? true : false,
      extra: { ssl: true },
    })
    .then((connection) => {
      // Serve Application
      const port = PORT || 9000;
      server.listen(port, () => {
        console.log(`----------`);
        console.log(`🚀  Server listening on port ${port}`);
        console.log(`🚀  DB: ${connection.isConnected ? "Ready" : "Failed"}!`);
        console.log(`----------`);
      });
    });
};

main().catch((err) => console.error(err));
