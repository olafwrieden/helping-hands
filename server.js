require("dotenv-safe").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const typeorm = require("typeorm");
const routes = require("./routes");

// Express App
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

// Create Server
const server = http.createServer(app);

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
