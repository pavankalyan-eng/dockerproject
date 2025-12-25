const transactionService = require('./TransactionService');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Health Checking
app.get('/health', (req, res) => {
    res.json("This is the health check");
});

// ADD TRANSACTION
app.post('/transaction', (req, res) => {
    try {
        const t = moment().unix();
        console.log("{ \"timestamp\" : %d, \"msg\": \"Adding Expense\" }", t);

        transactionService.addTransaction(req.body.amount, req.body.desc, function(err, result) {
            if (err) {
                return res.status(500).json({ message: 'Database failure', error: err.message });
            }
            res.status(200).json({ message: 'added transaction successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: 'something went wrong', error: err.message });
    }
});

// GET ALL TRANSACTIONS
app.get('/transaction', (req, res) => {
    try {
        transactionService.getAllTransactions(function (results) {
            const transactionList = results.map(row => ({
                id: row.id,
                amount: row.amount,
                description: row.description
            }));

            const t = moment().unix();
            console.log("{ \"timestamp\" : %d, \"msg\" : \"Getting All Expenses\" }", t);
            res.status(200).json({ "result": transactionList });
        });
    } catch (err) {
        res.status(500).json({ message: "could not get all transactions", error: err.message });
    }
});

// DELETE ALL TRANSACTIONS
app.delete('/transaction', (req, res) => {
    try {
        transactionService.deleteAllTransactions(function (result) {
            const t = moment().unix();
            console.log("{ \"timestamp\" : %d, \"msg\" : \"Deleted All Expenses\" }", t);
            res.status(200).json({ message: "delete function execution finished." });
        });
    } catch (err) {
        res.status(500).json({ message: "Deleting all transactions failed.", error: err.message });
    }
});

// DELETE ONE TRANSACTION
app.delete('/transaction/id', (req, res) => {
    try {
        transactionService.deleteTransactionById(req.body.id, function (result) {
            res.status(200).json({ message: `transaction with id ${req.body.id} deleted` });
        });
    } catch (err) {
        res.status(500).json({ message: "error deleting transaction", error: err.message });
    }
});

// GET SINGLE TRANSACTION
app.get('/transaction/id', (req, res) => {
    try {
        transactionService.findTransactionById(req.body.id, function (result) {
            // FIX: Check if result is empty to prevent crash
            if (!result || result.length === 0) {
                return res.status(404).json({ message: "Transaction not found" });
            }
            
            res.status(200).json({
                "id": result[0].id,
                "amount": result[0].amount,
                "desc": result[0].description // Matches the 'description' column in DB
            });
        });
    } catch (err) {
        res.status(500).json({ message: "error retrieving transaction", error: err.message });
    }
});

app.listen(port, () => {
    const t = moment().unix();
    console.log("{ \"timestamp\" : %d, \"msg\" : \"App Started on Port %s\" }", t, port);
});