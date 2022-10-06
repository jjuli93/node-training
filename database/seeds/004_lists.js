exports.seed = async (knex) => {
  await knex('lists').del();
  await knex('lists').insert([
    {
      id: 1,
      name: 'Best action movies',
      description: 'Here you have the top action movies ever!',
      public: false,
      user_id: 1,
    },
    {
      id: 2,
      name: 'Best drama movies',
      description: 'My top drama movies!',
      public: false,
      user_id: 1,
    },
  ]);
};
