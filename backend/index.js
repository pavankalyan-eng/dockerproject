const express = require("express");
const transactionService = require("./TransactionService");

const app = express();
app.use(express.json());

/* health check */
app.get("/", (req, res) => {
  res.send("Expense Backend is running");
});

/* fetch all expenses */
app.get("/expenses", (req, res) => {
  transactionService.getAllExpenses((err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

/* add expense (auto insert or manual add) */
app.post("/expenses", (req, res) => {
  const { amount, item } = req.body;

  transactionService.addExpense(amount, item, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Expense inserted successfully");
  });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
