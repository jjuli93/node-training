# Starter Home API
## Setup
- Create an `.env` file based on `.env.sample`
- Install expected node version (.nvmrc)
- Install dependencies `yarn install`
- Create the database `createdb database-name`
- Run migrations `npx knex migrate:latest`
- Run seeds `npx knex seed:run`

## Scripts
- Start server on dev: `yarn run dev`
- Run linter: `yarn run lint`
- Run tests: `yarn run test`
- Watch tests: `yarn run test-watch`
- Run migrations: `npx knex migrate:latest`
- Rollback migration: `npx knex migrate:rollback`
- Make migration: `npx knex migrate:make migration_name`
- Make seed: `npx knex seed:make seed_name`
- Run seeds: `npx knex seed:run`

## Running tests
- Create test database `createdb starter_home_test`
- Migrate test database `npx knex migrate:latest --env test`
