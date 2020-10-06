const { Thing } = require('../../../src/lib/things/things.model');

describe('Thing model', () => {
  it('create a thing', async () => {
    const thing = await Thing.query()
      .insert({})
      .returning('*');

    expect(thing.id).not.toBeNull();
  });
});
