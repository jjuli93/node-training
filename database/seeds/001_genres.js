exports.seed = async (knex) => {
  await knex('genres').del();
  await knex('genres').insert([
    { id: 1, name: 'comedy' },
    { id: 2, name: 'horror' },
    { id: 3, name: 'romance' },
    { id: 4, name: 'action' },
    { id: 5, name: 'drama' },
  ]);
};
