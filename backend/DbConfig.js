const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "mysql",               // docker service name
  user: "expense",
  password: "ExpenseApp@123",
  database: "transactions"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("MySQL connected successfully");
  }
});

module.exports = db;
