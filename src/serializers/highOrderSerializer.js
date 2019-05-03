const { pick } = require('lodash');

module.exports = function highOrderSerializer(
  enitiyName,
  collectionAttributes,
  individualAttributes = collectionAttributes,
) {
  return (entities) => {
    if (Array.isArray(entities)) {
      return { [enitiyName]: entities.map((thing) => pick(thing, collectionAttributes)) };
    }
    return pick(entities, individualAttributes);
  };
};
