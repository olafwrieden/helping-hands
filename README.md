# Helping Hands

The project repo for team Helping Hands, a Hack the Crisis: New Zealand (hackathon) team.

![Landing Page Hero](/screenshots/landing-page.gif "Landing Page Hero")

## Problem

### What is the problem?

We have heard the stories, COVID-19 is leaving the elderly, disabled, and immunocompromised members of our communities without access to essential food and medical supplies. Social distancing and a nation-wide lock-down measure mean our most vulnerable are left alone, fending for themselves, left with no other option but to risk infection during a trip to their nearest supermarket - if they even have the means to travel.

Fortunately, New Zealand is full of kind-hearted volunteers who have proven to be more than willing to assist where possible. The potential for volunteering (thus reducing the strain on government assistance) is huge, but locating those everyday small errands, like shopping or picking up medical supplies, is often limited to that one elderly neighbour across the fence. What if our impact could be bigger? What if we could help a complete stranger? What if one trip to the store can save a life?

### Briefly describe your idea or solution to address this problem

Our impact-driven platform allows at-risk community members to request a grocery or medicine pickup by a volunteer. Volunteers within a certain range are promptly notified that someone in their community needs help and can respond with an offer to help run errands for them. Now, the requester can accept the volunteer’s much-anticipated help; and after delivery to the agreed location (e.g. front door), pays via a suitable, supported payment method.

Let’s not forget what happened here: a bond, a friendship, was created; so both the at-risk individual and the volunteer should have an opportunity to connect as ‘buddies’, Thus the volunteer is notified first the next time a request is made, or simply able to check in on the individual via phone. Together, we seek to build resilient communities one simple deed at a time.

How do we leave New Zealand in a better place post-COVID-19, you ask? Well, every community has its heroes, so with a gradually growing network of volunteers, we want to make help accessible to those who need it most. The possibilities are truly exciting.

## Solution

|            Register            |            New Request            |
| :----------------------------: | :-------------------------------: |
| ![](/screenshots/register.gif) | ![](/screenshots/new-request.gif) |

|         Help Category          |          Request Details          |
| :----------------------------: | :-------------------------------: |
| ![](/screenshots/category.png) | ![](/screenshots/new-request.png) |

|  Volunteering Opportunities   |      Request Details      |
| :---------------------------: | :-----------------------: |
| ![](/screenshots/markers.png) | ![](/screenshots/map.png) |

|          My Buddies           |
| :---------------------------: |
| ![](/screenshots/buddies.gif) |

---

## Our Team

Our team consisted of 5 members (3 developers, and 2 non-coders). We also had an amazing team mentor. This hackathon was (as the title suggests) held during the COVID-19 lockdown. Therefore, our team collaborated virtually.
![Our Team](/screenshots/team-chat.png "Our Team")

---

## Getting up and Running

### The Technology

We built a TypeScript Express API (connecting to a PostgreSQL database) and React Frontend in a monorepo. This allowed us to contain the entire project in one repository and deploy it to Heroku. We configured a Heroku Pipeline as follows:

1. When a Pull Request is made against _master_, Heroku builds a [Review App](https://blog.heroku.com/heroku-review-apps-ga) which can be shared with the team and mentors during the event (for rapid prototyping and feedback of proposed features in development - testing functionality with a real audience).
2. When a Pull Request is merged (it requires at least one review to merge into _master_), Heroku rebuilds the staging environment.
3. Finally, when we are ready to go live with the new features, Heroku allowed us to "_Promote to Production_" the staging environment. This updates the publicly accessible application.

### Running Helping Hands in Development

1. In the project's root directory, create a file called `.env` and paste the following. Be sure to change the credentials to you Postgres credentials.

   ```javascript
   DB_HOST = [YOUR_POSTGRES_HOST];
   DB_PORT = [YOUR_POSTGRES_PORT];
   DB_USER = [YOUR_POSTGRES_USERNAME];
   DB_PASS = [YOUR_POSTGRES_PASSWORD];
   DB_DATABASE = [YOUR_POSTGRES_DATABASE];
   ```

2. Install the API's dependencies by running:

   ```
   $ npm install
   ```

3. To install the React.js dependencies, first navigate to the `/client` directory:

   ```
   $ cd client
   ```

   then install its dependencies:

   ```
   $ npm install
   ```

   and switch back to the project's root directory:

   ```
   $ cd ..
   ```

4. To start both the Express API and React App in development mode, run the following in the root directory:

   ```
   $ npm run dev
   ```

   **Note:** To start the server or client independently: `$ npm run dev:server` or `$ npm run dev:app` respectively. However, the front end is dependent on the API and will not fully function without it.

5. React should automatically open the default web browser to the live render of the site. You will now be presented with the landing page for Helping Hands.

![Landing Page](/screenshots/hero.png "Landing Page")

---

### See something that can be improved?

Remember: Hackathons are intensives focused on the overall usability and processes behind the development of the website, often sacrificing code quality for time.

While this is not an active project, we would love to hear from you. Feel free to submit a Pull Request if you can improve this repository, or open an issue should you encounter a bug. 🐞
