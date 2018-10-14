const DB = require('knex')
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];

const Knex = DB({
  client: 'pg',
  connection: config.connection,
  acquireConnectionTimeout: 30000,
  pool: config.pool,
})

exports.Knex = Knex