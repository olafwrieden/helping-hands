# Heroku Monorepo
This repo documents how to deploy a React.js + Express.js monorepo to Heroku.

![React.js + Express.js Deployment](https://i.imgur.com/lg6FOC9.png "React.js + Express.js Deployment")

#### Getting up and Running
1. In the project's root directory, create a file called `.env` and paste the following: `DATABASE_URL='[YOUR-POSTGRES-URL]'`.
2. Install the dependencies by runnning `$ npm install`.
3. To start both the Express API and React App in development mode, run `$ npm run dev`. Note: To start them independently, run `$ npm run dev:server` and `$ npm run dev:app` respectively.

#### How does Heroku deploy it?
1. With a Heroku Pipeline configured, Heroku creates Review Apps for each Pull Request. These allow us to view our changes as independent apps for collaboration and feedback on functionality from stakeholders.
2. Once merged into the `master` branch, Heroku detects the change and automatically begins to build a new version of the app in a staging environment. Heroku refers to the the `heroku-postbuild` script in [package.json](/package.json#L12) for details on how to build the client-side code. Now, Express.js serves the build directory.
3. When ready, we "Promote to Production" from Heroku, pushing our stage to the customer-facing environment. Done.

#### Inspiration
- [React.js + Express.js Production Deployment](https://github.com/esausilva/react-production-deployment/tree/master/heroku)
- [A Clean Approach to Using Express Validator](https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go)
- [Node.js Server & Authentication Basics: Express, Sessions, Passport, and cURL](https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d)
