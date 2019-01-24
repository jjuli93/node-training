
exports.seed = (knex, Promise) => {
  return knex('homes').del()
    .then(() => {
      return knex('homes').insert([
        { name: 'name1' },
        { name: 'name2' },
        { name: 'name3' },
      ]);
    });
};
