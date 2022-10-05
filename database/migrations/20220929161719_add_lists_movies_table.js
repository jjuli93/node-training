exports.up = async (knex) =>
  knex.schema.createTable('lists_movies', (table) => {
    table.increments();
    table.integer('movie_id').unsigned();
    table.foreign('movie_id').references('movies.id');
    table.integer('list_id').unsigned();
    table.foreign('list_id').references('lists.id');
  });

exports.down = async (knex) => {
  await knex.schema.alterTable('lists_movies', (table) => {
    table.dropForeign('list_id');
    table.dropColumn('list_id');
    table.dropForeign('movie_id');
    table.dropColumn('movie_id');
  });
  await knex.schema.dropTable('lists_movies');
};
