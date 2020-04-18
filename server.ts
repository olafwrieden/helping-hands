import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {createConnection, getConnection } from "typeorm";
import {Users} from "./src/entity/Users";
import routes from "./src/routes/v1/index";
import * as passport from 'passport';
import * as passportLocal from "passport-local";
import * as bcrypt from 'bcrypt';
import * as session from 'express-session';
import { v4 } from 'uuid';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const LocalStrategy = passportLocal.Strategy;

// Configure Passport.js with Local Strategy
passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      const User = getConnection('default').getRepository("Users");
      User.createQueryBuilder()
        .where({ email })
        .addSelect("password", "User_password")
        .getOne()
        .then((user: Users) => {
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
    const User = getConnection('default').getRepository("Users");
    User.findOne(id)
      .then((user) => done(null, user))
      .catch((error) => done(error, false));
  });

createConnection().then(async connection => {

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
    
    app.use('/api/v1', routes)
    
    app.listen(4000, () => {
        console.log(`----------`);
        console.log(`🚀  Server listening on port 4000`);
        console.log(`🚀  DB: ${connection.isConnected ? "Ready" : "Failed"}!`);
        console.log(`----------`);
      });

}).catch(error => console.log(error));
