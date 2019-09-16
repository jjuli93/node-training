require('dotenv').config();

module.exports = {
  [process.env.NODE_ENV]: {
    client: 'postgresql',
    connection: {
      database: `${process.env.DATABASE}_${process.env.NODE_ENV}`,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
