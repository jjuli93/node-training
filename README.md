# Node.js API skeleton

## Bootstrapping

- Read the rest of this README.md
- Follow the setup section
- Run the tests
- Start the server
- Go to http://localhost:3000/api/things

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
- Install dependencies `yarn install`
- Create the database `createdb database_name`
- Run migrations `npx knex migrate:latest`
- Run seeds `npx knex seed:run`

# Usage

## Scripts

- Start server on dev: `yarn run dev`
- Run linter: `yarn run lint`
- Run migrations: `npx knex migrate:latest`
- Rollback migration: `npx knex migrate:rollback`
- Make migration: `npx knex migrate:make migration_name`
- Make seed: `npx knex seed:make seed_name`
- Run seeds: `npx knex seed:run`

## Running tests

- Create test database `createdb things_test`
- Migrate test database `npx knex migrate:latest --env test`
- Run tests: `yarn run test`
- Watch tests: `yarn run test-watch`

## Specific Documentation

- [Authentication](lib/authentication.md)
- [Serializer](lib/serializer.md)
- [Pagination](lib/middlewares.md)
