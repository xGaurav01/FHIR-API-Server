const { Pool } = require("pg");

const database = new Pool({
    user: "gaurav",
    host: "localhost",
    database: "fhir_db",
    password: "gaurav@76500",
    port: 5432,
  });
  
  module.exports = database