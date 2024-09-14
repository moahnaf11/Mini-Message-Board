const { Pool } = require("pg");
require("dotenv").config();


module.exports = new Pool({
    connectionString: process.env.DATABASE_URL, // The default port
    ssl: {
        rejectUnauthorized: false
    }
});

