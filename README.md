# CoScheduleCodeChallenge

## Overview

Use this application to enter the funny, weird, crazy, and at times creepy, world of giphs. After creating a user account, search for giphs and save your favorites. Add a unique caption and reaction to view later as you flip through your giphs in the giphy library. Feel free to change your caption, or, if you're collection is getting too big, make some room by clearing out the old ones.

Instead of doing a star review set-up I added 5 different reactions with common texting abbreviations or phrases one would use sending the giph to a friend. I decided to look at the comments through the lens of adding a caption, which, together with the reaction, can make for funny or interesting combinations when displayed along with the giph in the giph library.

## Dependencies

This application uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `code_challenge` and use the SQL below to set up:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

CREATE TABLE "favorites" (
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR (200),
    "category_id" INT REFERENCES "category",
    "caption" VARCHAR (200)
);

INSERT INTO "category" ("name")
VALUES ('Um...'), ('...WTF?'), ('LOL!!'), ('ROTFL'), ('Weird Flex');

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
