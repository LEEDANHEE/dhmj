const mysql = require('mysql');
const dbConfig = require('../config/mysql-config');
const util = require('util')

let pool = mysql.createPool(dbConfig);

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            global.logger.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            global.logger.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            global.logger.error('Database connection was refused.')
        }
    }

    if (connection) connection.release();

    return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool;
