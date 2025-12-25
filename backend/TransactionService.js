const dbcreds = require('./DbConfig');
const mysql = require('mysql2'); 

// 1. Connection Pool (Optimized for Docker)
const pool = mysql.createPool({
    host: process.env.DB_HOST || dbcreds.DB_HOST || 'mysql', 
    user: process.env.DB_USER || dbcreds.DB_USER || 'root',
    password: process.env.DB_PWD || dbcreds.DB_PWD || 'root_password',
    database: process.env.DB_DATABASE || dbcreds.DB_DATABASE || 'my_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 2. addTransaction
function addTransaction(amount, desc, callback) { 
    const sql = "INSERT INTO `transactions` (`amount`, `description`) VALUES (?, ?)";
    pool.query(sql, [amount, desc], function(err, result) {
        if (err) return callback(err); 
        return callback(null, result); 
    });
}

// 3. getAllTransactions
function getAllTransactions(callback) {
    const sql = "SELECT * FROM transactions";
    pool.query(sql, function(err, result) {
        if (err) return callback(err); // Improved error handling
        return callback(null, result);
    });
}

// 4. findTransactionById
function findTransactionById(id, callback) {
    const sql = "SELECT * FROM transactions WHERE id = ?";
    pool.query(sql, [id], function(err, result) {
        if (err) return callback(err); // Improved error handling
        return callback(null, result);
    });
}

// 5. deleteAllTransactions
function deleteAllTransactions(callback) {
    const sql = "DELETE FROM transactions";
    pool.query(sql, function(err, result) {
        if (err) return callback(err); // Improved error handling
        return callback(null, result);
    });
}

// 6. deleteTransactionById
function deleteTransactionById(id, callback) {
    const sql = "DELETE FROM transactions WHERE id = ?";
    pool.query(sql, [id], function(err, result) {
        if (err) return callback(err); // Improved error handling
        return callback(null, result);
    });
}

module.exports = {
    addTransaction,
    getAllTransactions,
    findTransactionById,
    deleteAllTransactions,
    deleteTransactionById
};