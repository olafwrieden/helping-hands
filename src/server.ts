import * as dotenv from "dotenv-safe";
import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { createConnection, getConnection } from "typeorm";
import routes from "./routes/v1/index";
import * as passport from 'passport';
import * as passportLocal from "passport-local";
import * as bcrypt from 'bcryptjs';
import * as session from 'express-session';
import { v4 } from 'uuid';
import * as path from 'path';
import { Users, Buddy, Request, Rating } from './entity/index';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const HTTP_PORT = process.env.PORT || 9000;

dotenv.config()
//Done to allow Users type checking on User type when doing authentication
declare global {
  namespace Express {
    interface User extends Users { }

    interface Request {
      user?: User;
    }
  }
}

const LocalStrategy = passportLocal.Strategy;

// Configure Passport.js with Local Strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const User = getConnection('default').getRepository<Users>("Users");
    User.createQueryBuilder()
      .where({ email })
      .addSelect('password', 'Users_password')
      .addSelect('enabled', 'Users_enabled')
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
passport.serializeUser((user: Users, done) => {
  done(null, user.id);
});

// Tell Passport How to Deserialize User
passport.deserializeUser((id, done) => {
  const User = getConnection('default').getRepository<Users>("Users");
  User.findOne(id)
    .then((user) => done(null, user))
    .catch((error) => done(error, false));
});

createConnection(
  {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_HOST),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: process.env.NODE_ENV !== "production" ? true : false,
    entities: [Users, Buddy, Rating, Request]
  }).then(async connection => {
    // Add Session Middleware
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

    // Init Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // In Production, serve React build
    if (process.env.NODE_ENV === "production") {
      // Serve Static Files
      app.use(express.static(path.join(__dirname, "../client/build")));

      // Handle React Routing: Return all Requests to React
      app.get("*", function (_, res) {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
      });
    }

    app.use('/api/v1', routes)

    app.listen(HTTP_PORT, () => {
      console.log(`----------`);
      console.log(`🚀  Server listening on port ${HTTP_PORT}`);
      console.log(`🚀  DB: ${connection.isConnected ? "Ready" : "Failed"}!`);
      console.log(`----------`);
    });

  }).catch(error => console.log(error));
