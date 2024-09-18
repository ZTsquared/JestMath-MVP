# JestMath

## Elementary level math game

This app is a basic math game in which children can practice math problems and earn jokes in return. The game is designed to be managed by a parent or other adult who can curate both the questions and the jokes based on their child's skills and interests.
The project had been deployed with Heroku and can be tested at https://stormy-woodland-95005-0e0ee6fa38ff.herokuapp.com/

Built with: node.js, react, express, and a bit of bootstrap 5.

## Setup

### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

Install packages MySQL, Nodemon, Dotenv and CORS: `npm install mysql nodemon dotenv cors`

`cd client` and run `npm install` install dependencies related to React (the client).

For information on how the project was originally set up see the preliminary Project Scaffolding document provided in this repository `reference_documents/ProjectScaffolding.pdf` - you will not need to do all these steps, but I am providing it for referece incase something is not working as you expect.

### Database Prep

Create `.env` file in project directory and add

```
  DB_HOST=localhost
  DB_USER=YOUR_DATABASE_NAME
  DB_NAME=ZIAfs32MVP
  DB_PASS=YOUR_PASSWORD
  SUPER_SECRET=XXXXXXX (secret key for use with JWT)
```

(replace `YOUR_PASSWORD` with your actual password)

In the MySQL CLI, log in and then type `create database <YOUR_DATABASE_NAME>;` to create a database in MySQL.

Run the following in the MySQL CLI: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD';` (replace `YOUR_PASSWORD` with your actual password)

Run `npm run migrate` and `npm run seed` in your **TERMINAL**, in the **project** folder. This will create the following tables in your database:

#### Questions

This table contains the math problems. It will be automatically populated with starter questions.

For the time being the questions are shown in the app exactly as written in SQL. The route to post a question uses the eval() method to calculate the answer so questions must be written in a format and syntax that javascript can calculate. You can add questions to the database directly from the parent portal of the app.

#### Households

This table contains household account data such as email, username and password (automatically encrypted with bcrypt) and automatically populated with 2 test households. Each household can contain multiple users, representing child playes in the household.

#### Users

This table contains user data and is automatically populated with some test users. Each user must belong to a household.

The table contains 'UserName' and 'UserAge' which must be set manually when the user is created. There are also columns for 'balance' and 'lifetimeTotal' which default to 0 on user creation.

When users earn stars they are added to the balance and the lifetimeTotal, when users buy jokes stars are deducted from the balance but not from the lifetimeTotal.

#### Jokes

This table contains the jokes. It will be automatically populated with about 20 jokes.

The 3 columns contain the joke's setup, punchline and joke type. Joke type is limited to knockknock, riddle, or comic (comic is not fully built out yet). The formating of the joke on the screen is dependant on type so any other joke type will break the code as it is currently written. The post route for the jokes table protects against this, but be careful if you add jokes directly from SQL.

#### UsersJokes

This is a junction table for tracking which users own which jokes in their private library. An entry is made in this table whenever a user purchases a joke.

### Run Your Development Servers

- Run `npm start` in project directory to start the Express server on port 4000
- `cd client` and run `npm run dev` to start client server in development mode with hot reloading in port 5173.
- Client is configured so all API calls will be proxied to port 4000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:5173`
- You can test your API in `http://localhost:4000/api`

## Things to know

### 1. General

Read through all the comments in the code. I tried to comment it fairly thoroughly, though since I am actively working on the codes some comments may not always be perfectly up to date (same with some information in this readme)

### 2. The Routes

There is a route file for each table. Any route that modifies that table or draws data primarily based on that table will be in that file. The exception to this is that the routes for the households table are mainly in the auth file since creating a household is a registration event.

The routes should be fairly straight forward. The only tricky thing is the mustExist and mustNotExist functions in the guards folder. These are not actually guard functions, they are higher order functions that return a customized guard function based on the parameters `(queryParamKey, queryTableName, queryColumnName)` you feed them. This way the function can be used to test if a userName exists in the users table, or an id exists in the questions table, or whatever you like. As written you do have to pass the value you want to validate (queryParamKey) in the req.params , not the body for it to work, but that could be adjusted.

### 3. The SPA pages

#### App

The app contains the page routes, most of which are protected routes requiring login. Auth & Auth status is stored in react context along with current household name and current user information for use site-wide.

#### Welcome

This is the primary landing page and login page

#### Quiz

This starting view for this page is just a button allowing you to start a round of game play. When you start a round 10 random questions are fetched from the database.

Questions are displayed one at a time, you have as many tries as you like to enter an answer and have the ability to skip questions. A correct answer adds 1 star to the user's balance.

There is a scratch paper text area to take notes, but this is not stored in any way. It is just for temporary scratch work.

At the end of the round you are prompted to move to the next round

#### Store

As long as the user's balance is high enough they can buy a joke. The Joke is "told" step by step and also added to the user's library. The price of the joke is also deducted from the user's balance.

#### Library

Here a user can see all the jokes they have previously bought.

#### ParentPortal

In this portal you can add questions to the questions database table - I have deactivated this in the front end for the time being but the code is there. In future this portal should also allow parents to curate and delete questions.

In future parents should be able to add jokes from here as well.

### 4. Possible future features

- create a better method for inputing and evaluating equations and then mapping to a kid friendly question display.
- giving the questions a level rating, and having the age of the child dictate which levels of questions they get, but give the child a "make harder"/"make easier" button that adjusts what levels they are given
- make a topics table and assign jokes multiple topics, allow children to buy jokes based on topic
- provide a results summary at the end of the round showing all the questions, the user's guesses/answers and the correct answer
- give parent ability to see all historic results including wrong answers and even how much time was spent before answering
- let parents have a portal that pulls jokes from a public api so they can vet the jokes and decide which ones to add to the household database.

## Resources

- [MySQL Cheat Sheet](http://www.mysqltutorial.org/mysql-cheat-sheet.aspx)
- [MySQL](https://dev.mysql.com/doc/refman/8.0/en/database-use.html)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [React Documentation](https://react.dev/)

## Notes

_This is a student project that was created by Zia Tyebjee at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._
