const Pool = require('pg').Pool;

const pool = new Pool({
    host : 'localhost',
    user : 'learnpern',
    password : 'learnpern123',
    port : 5432,
    database : 'learnpern'
});

module.exports = pool;