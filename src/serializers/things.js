const highOrderSerializer = require('./highOrderSerializer');

const COLLECTION_ATTRIBUTES = ['name'];
const INDIVIDUAL_ATTRIBUTES = ['name', 'created_at'];

module.exports = highOrderSerializer('things', COLLECTION_ATTRIBUTES, INDIVIDUAL_ATTRIBUTES);
