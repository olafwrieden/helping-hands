import * as express from 'express';

let router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ greeting: `Hello From Express, ${req.user}!` });
  } else {
    res.status(401).send({ message: "Not Authorized" });
  }
});

router.post("/submit", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ greeting: `Hello From Express, ${req.user}!` });
  } else {
    res.status(401).send({ message: "Not Authorized" });
  }
});

export default router;