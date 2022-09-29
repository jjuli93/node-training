exports.up = async (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email');
    table.string('full_name');
    table.string('photo_path');
    table.string('password_salt');
    table.string('password_hash');
  });

exports.down = async (knex) => knex.schema.dropTable('users');
