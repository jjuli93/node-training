exports.up = async (knex) =>
  knex.schema.createTable('movies', (table) => {
    table.increments();
    table.string('title');
    table.string('tagline');
    table.string('overview');
    table.date('release_date');
    table.string('poster_url');
    table.string('backdrop_url');
    table.string('imdb_id');
    table.integer('genre_id').unsigned();
    table.foreign('genre_id').references('genres.id');
  });

exports.down = async (knex) => {
  await knex.schema.alterTable('movies', (table) => {
    table.dropForeign('genre_id');
    table.dropColumn('genre_id');
  });
  await knex.schema.dropTable('movies');
};
