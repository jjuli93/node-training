exports.seed = async (knex) => {
  await knex('genres').del();
  await knex('genres').insert([
    { name: 'comedy' },
    { name: 'horror' },
    { name: 'romance' },
    { name: 'action' },
    { name: 'drama' },
  ]);
};
