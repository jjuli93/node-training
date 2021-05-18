#!/bin/sh
set -e

# Run migrations
npx knex migrate:latest

# Uncomment the following line to support secrets on AWS (also install jq as dependency)
#export $(echo $SECRETS | jq -j "to_entries|map(\"\(.key)=\(.value|tostring) \")|.[]")

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
