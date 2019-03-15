exports.up = knex => (
  knex.schema.createTable('things', (table) => {
    table.increments();
    table.string('name');
    table.timestamps(false, true);
  })
);

exports.down = knex => knex.schema.dropTable('things');
