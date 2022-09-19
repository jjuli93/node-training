exports.up = async (knex) =>
  knex.schema.createTable('genres', (table) => {
    table.increments();
    table.string('name');
  });

exports.down = async (knex) => knex.schema.dropTable('things');
