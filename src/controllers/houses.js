const index = (ctx) => {
  ctx.body = { houses: [{ id: 1 }, { id: 2 }, { id: 3 }] };
};

module.exports = { index };
