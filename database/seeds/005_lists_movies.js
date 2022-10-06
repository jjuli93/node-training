exports.seed = async (knex) => {
  await knex('lists_movies').del();
  await knex('lists_movies').insert([
    {
      id: 1,
      list_id: 1,
      movie_id: 2,
    },
    {
      id: 2,
      list_id: 1,
      movie_id: 3,
    },
    {
      id: 3,
      list_id: 2,
      movie_id: 1,
    },
    {
      id: 4,
      list_id: 2,
      movie_id: 4,
    },
  ]);
};
