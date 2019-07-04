exports.seed = (knex, Promise) =>
  knex('things')
    .del()
    .then(() =>
      knex('things').insert([
        { name: 'name1', category_id: 1 },
        { name: 'name2', category_id: 1 },
        { name: 'name3', category_id: 2 },
      ]),
    );
