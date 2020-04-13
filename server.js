require("dotenv-safe").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const typeorm = require("typeorm");
const routes = require("./routes");

// API Server
const app = express();
const { PORT, DATABASE_URL } = process.env;
const EntitySchema = typeorm.EntitySchema;

// API Middleware
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use("/api", routes);

// In Production, serve React build
if (process.env.NODE_ENV === "production") {
  // Serve Static Files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React Routing: Return all Requests to React
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const main = async () => {
  // Connect to Database
  typeorm
    .createConnection({
      url: DATABASE_URL,
      type: "postgres",
      entities: [new EntitySchema(require("./entities/User"))],
      synchronize: true,
      logging: true,
      extra: { ssl: true },
    })
    .then((connection) => {
      var userRepository = connection.getRepository("User");
      userRepository.find().then((users) => console.log(users));

      // Serve Application
      const port = PORT || 9000;
      app.listen(port, () => {
        console.log(`----------`);
        console.log(`🚀  Server listening on port ${port}`);
        console.log(`🚀  DB: ${connection.isConnected ? "Ready" : "Failed"}!`);
        console.log(`----------`);
      });
    });
};

main().catch((err) => console.error(err));
