const API = "http://backend:3000/expenses";
function autoInsertOnce() {
  if (!localStorage.getItem("autoInserted")) {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 100,
        item: "travel"
      })
    }).then(() => {
      localStorage.setItem("autoInserted", "yes");
      loadExpenses();
    });
  } else {
    loadExpenses();
  }
}

/* LOAD ALL EXPENSES */
function loadExpenses() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("expenseTable");
      table.innerHTML = "";
      data.forEach(e => {
        table.innerHTML += `
          <tr>
            <td>${e.id}</td>
            <td>${e.amount}</td>
            <td>${e.item}</td>
          </tr>
        `;
      });
    });
}

/* MANUAL ADD BUTTON */
function addExpense() {
  const amount = document.getElementById("amount").value;
  const desc = document.getElementById("desc").value;

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, item: desc })
  }).then(() => {
    document.getElementById("amount").value = "";
    document.getElementById("desc").value = "";
    loadExpenses();
  });
}

/* PAGE LOAD */
autoInsertOnce();
