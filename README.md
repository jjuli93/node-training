# Starter Home API
## Setup
- Create an `.env` file based on `.env.sample`
- Install expected node version (.nvmrc)
- Install dependencies `npm install`
- Create the database `createdb database-name`
- Run migrations `npx knex migrate:latest`
- Run seeds `npx knex seed:run`

## Scripts
- Start server on dev: `npm run dev`
- Run linter: `npm run lint`
- Run tests: `npm run test`
- Watch tests: `npm run test-watch`
- Run migrations: `npx knex migrate:latest`
- Rollback migration: `npx knex migrate:rollback`
- Make migration: `npx knex migrate:make migration_name`
- Make seed: `npx knex seed:make seed_name`
- Run seeds: `npx knex seed:run`

## Running tests
- Create test database `createdb starter-home-test`
- Migrate test database `npx knex migrate:latest --env test`
