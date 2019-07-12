require('dotenv').config();

const { initializeApp } = require('../lib');
const constants = require('./constants');
const router = require('./router');

const app = initializeApp({ router });

app.listen(constants.PORT);
