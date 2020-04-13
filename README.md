# Heroku Monorepo
This repo documents how to deploy a React.js + Express.js monorepo to Heroku.

#### How does Heroku deploy it?
1. With a Heroku Pipeline configured, Heroku creates Review Apps for each Pull Request. These allow us to view our changes as independent apps for collaboration and feedback on functionality from stakeholders.
2. Once merged into the `master` branch, Heroku detects the change and automatically begins to build a new version of the app in a staging environment. Heroku refers to the the `heroku-postbuild` script in [package.json](/package.json#L12) for details on how to build the client-side code. Now, Express.js serves the build directory.
3. When ready, we "Promote to Production" from Heroku, pushing our stage to the customer-facing environment. Done.