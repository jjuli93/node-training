
exports.seed = (knex, Promise) => {
  return knex('things').del()
    .then(() => {
      return knex('things').insert([
        { name: 'name1' },
        { name: 'name2' },
        { name: 'name3' },
      ]);
    });
};
