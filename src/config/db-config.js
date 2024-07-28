const { Pool } = require("pg");

const database = new Pool({
    user: "username",
    host: "localhost",
    database: "db_name",
    password: "password",
    port: 5432,
  });
  
  module.exports = database