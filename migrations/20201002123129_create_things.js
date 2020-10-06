exports.up = (knex) => {
  return knex.schema.createTable('things', (table) => {
    table.increments();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('things');
};
