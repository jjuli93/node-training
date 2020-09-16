# Node.js API skeleton

## Bootstrapping

- Read the rest of this README.md
- Follow the setup section
- Run the tests
- Start the server

After all is setup & running, feel free to remove the local git repository and initialize a new one, rename databases,
and remove the sample source code.

## Stack

- koa2 & friends
- Objection.js
- knex
- jest
- PostgreSQL

## Setup

- Create an `.env` file based on `.env.sample`
- Install expected node version (.nvmrc)
- Install dependencies `npm install`
- Create the database `createdb <env.DATABASE>_development` where <env.DATABASE> is the DATABASE key in the .env file
- Run migrations `npx knex migrate:latest`
- Run seeds `npx knex seed:run`

### Database Setup

When configuring the database you can either setup the database depending on the environment, using
`DATABASE` if you use this configuration a database with that string plus the environment is going
to be created ex. `awesome_development`, or you can use `DATABASE_NAME` and that will directly use
that string (this is useful for production environments where you want to just set the name of the
database and not depend on the environment).

# Usage

## Scripts

## Hygen code generators
- To generate an entity scaffold: `npx hygen generate scaffold`

- Start server on dev: `npm run dev`
- Run linter: `npm run lint`

- Make migration: `npx hygen generate migration`
- Run migrations: `npx knex migrate:latest`
- Rollback migration: `npx knex migrate:rollback`


- Make seed: `npx hygen generate seed`
- Run seeds: `npx knex seed:run`

## Running tests

- Create test database `createdb <env.DATABASE>_test` where <env.DATABASE> is the DATABASE key in the .env file
- Migrate test database `npx knex migrate:latest --env test`
- Run tests: `npm run test`
- Watch tests: `npm run test-watch`

## Specific Documentation

- [Authentication](lib/authentication.md)
- [Serializer](lib/serializer.md)
- [Pagination](lib/middlewares.md)
