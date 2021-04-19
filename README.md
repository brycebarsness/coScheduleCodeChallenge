# CoScheduleCodeChallenge

## Dependencies

This application uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `code_challenge` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

## Development Setup Instructions

- Create a .env file to hold Giphy API key and SERVER_SESSION_SECRET
  It should look like this...
  SERVER_SESSION_SECRET=25POUbVtx6RKVNWszd9ER#### (replace #### with four numbers)
  GIPHY_API_KEY= ( get an API key here --> https://developers.giphy.com/docs/api/)

- Run `npm install`
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`
- Register new user

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `server/` contains the Express App
- `database.sql/` contains postgreSQL code for Postico
