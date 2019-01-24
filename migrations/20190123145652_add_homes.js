exports.up = knex => (
  knex.schema.createTable('homes', (table) => {
    table.increments();
    table.string('name');
    table.timestamps(false, true);
  })
);

exports.down = knex => knex.schema.dropTable('homes');
