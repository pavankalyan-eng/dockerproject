const dbcreds = require('./DbConfig');
const mysql = require('mysql2'); 

// 1. Create a Connection Pool (Better for Docker stability)
const pool = mysql.createPool({
    host: process.env.DB_HOST || dbcreds.DB_HOST || 'mysql', 
    user: process.env.DB_USER || dbcreds.DB_USER || 'root',
    password: process.env.DB_PWD || dbcreds.DB_PWD || 'root_password',
    database: process.env.DB_DATABASE || dbcreds.DB_DATABASE || 'my_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 2. addTransaction function using Parameterized Queries
function addTransaction(amount, desc, callback) { 
    const sql = "INSERT INTO `transactions` (`amount`, `description`) VALUES (?, ?)";
    
    pool.query(sql, [amount, desc], function(err, result) {
        if (err) {
            console.error("Database Error:", err.message);
            return callback(err); 
        }
        return callback(null, result); 
    });
    // Removed "return 200" because we now use the callback instead
}

// 3. getAllTransactions function
function getAllTransactions(callback) {
    const sql = "SELECT * FROM transactions";
    pool.query(sql, function(err, result) {
        if (err) {
            console.error("Database Error in getAllTransactions:", err.message);
            return;
        }
        return callback(result);
    });
}

// 4. findTransactionById function
function findTransactionById(id, callback) {
    const sql = "SELECT * FROM transactions WHERE id = ?";
    pool.query(sql, [id], function(err, result) {
        if (err) {
            console.error("Database Error in findTransactionById:", err.message);
            return;
        }
        console.log(`Retrieving transaction with id ${id}`);
        return callback(result);
    });
}

// 5. deleteAllTransactions function
function deleteAllTransactions(callback) {
    const sql = "DELETE FROM transactions";
    pool.query(sql, function(err, result) {
        if (err) {
            console.error("Database Error in deleteAllTransactions:", err.message);
            return;
        }
        return callback(result);
    });
}

// 6. deleteTransactionById function
function deleteTransactionById(id, callback) {
    const sql = "DELETE FROM transactions WHERE id = ?";
    pool.query(sql, [id], function(err, result) {
        if (err) {
            console.error("Database Error in deleteTransactionById:", err.message);
            return;
        }
        console.log(`Deleting transaction with id ${id}`);
        return callback(result);
    });
}

module.exports = {
    addTransaction,
    getAllTransactions,
    findTransactionById,
    deleteAllTransactions,
    deleteTransactionById
};