exports.up = async (knex) =>
  knex.schema.createTable('lists', (table) => {
    table.increments();
    table.string('name');
    table.string('description');
    table.boolean('public');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
  });

exports.down = async (knex) => {
  await knex.schema.alterTable('lists', (table) => {
    table.dropForeign('user_id');
    table.dropColumn('user_id');
  });
  await knex.schema.dropTable('lists');
};
