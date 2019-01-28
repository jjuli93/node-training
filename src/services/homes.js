const homeRepo = require('../repos/home');

const getHomes = () => homeRepo.all();

module.exports = { getHomes };
