const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync('password', salt);

exports.seed = async (knex) => {
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      email: 'test@test.com',
      full_name: 'test name',
      photo_path: null,
      password_salt: salt,
      password_hash: hash,
    },
  ]);
};
