import * as dotenv from "dotenv-safe";
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

dotenv.config()
//Done to allow Users type checking on User type when doing authentication
declare global {
  namespace Express {
      interface User extends Users {}

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
    entities: [
       "src/entity/**/*.ts"
    ],
    migrations: [
       "src/migration/**/*.ts"
    ],
    subscribers: [
       "src/subscriber/**/*.ts"
    ],
    cli: {
       entitiesDir: "src/entity",
       migrationsDir: "src/migration",
       subscribersDir: "src/subscriber"
    }
 }).then(async connection => {
  // {
  //   url: DATABASE_URL,
  //   type: "postgres",
  //   entities: [new EntitySchema(require("./entities/User"))],
  //   synchronize: false,
  //   logging: NODE_ENV !== "production" ? true : false,
  //   extra: { ssl: true },
  // }
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
