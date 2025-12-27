const db = require("./DbConfig");

/* get all expenses */
exports.getAllExpenses = (callback) => {
  db.query("SELECT * FROM expenses", callback);
};

/* insert expense (auto or manual) */
exports.addExpense = (amount, item, callback) => {
  const sql = "INSERT INTO expenses (amount, item) VALUES (?, ?)";
  db.query(sql, [amount, item], callback);
};
