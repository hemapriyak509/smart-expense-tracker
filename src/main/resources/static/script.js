const API_URL = "/api/expenses";

let allExpenses = [];


// Load expenses when page opens
window.onload = function () {
    loadExpenses();
};


// Add Expense
function addExpense() {

    const expense = {
        title: document.getElementById("title").value,
        amount: parseFloat(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        date: document.getElementById("date").value,
        description: document.getElementById("description").value
    };


    // Validation
    if (
        !expense.title.trim() ||
        isNaN(expense.amount) ||
        expense.amount <= 0 ||
        !expense.category ||
        !expense.date
    ) {
        alert("Please fill all required fields correctly.");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
    })

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
    })
    .then(response => response.json())
    .then(data => {

        alert("Expense added successfully!");

        clearForm();
        loadExpenses();

    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to add expense");
    });
}


// Get all expenses
function loadExpenses() {

    fetch(API_URL)
        .then(response => response.json())
        .then(expenses => {

            allExpenses = expenses;

            displayExpenses(allExpenses);

        })
        .catch(error => {
            console.error("Error:", error);
        });
}


// Display expenses
function displayExpenses(expenses) {

    const expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(expense => {

        total += expense.amount;

        const div = document.createElement("div");

        div.innerHTML = `
            <div style="
                background:white;
                padding:15px;
                margin-bottom:10px;
                border-radius:10px;
                box-shadow:0 3px 10px rgba(0,0,0,0.08);
            ">

                <h3>${expense.title}</h3>

                <p>Amount: ₹${expense.amount}</p>

                <p>Category: ${expense.category}</p>

                <p>Date: ${expense.date}</p>

                <p>${expense.description}</p>

                <button onclick="editExpense(${expense.id})">Edit</button>
<button onclick="deleteExpense(${expense.id})">Delete</button>

            </div>
        `;

        expenseList.appendChild(div);
    });

    document.getElementById("total").textContent = total.toFixed(2);
}


// Search and Category Filter
function filterExpenses() {

    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const selectedCategory = document
        .getElementById("categoryFilter")
        .value;

    const filteredExpenses = allExpenses.filter(function(expense) {

        const title = (expense.title || "").toLowerCase();
        const description = (expense.description || "").toLowerCase();
        const category = expense.category || "";

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText);

        const matchesCategory =
            selectedCategory === "" ||
            category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayExpenses(filteredExpenses);
}


// Clear form
function clearForm() {

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
}
// Edit Expense
function editExpense(id) {

    const expense = allExpenses.find(e => e.id === id);

    if (!expense) {
        alert("Expense not found");
        return;
    }

    document.getElementById("title").value = expense.title;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("category").value = expense.category;
    document.getElementById("date").value = expense.date;
    document.getElementById("description").value = expense.description;

    const newTitle = prompt("Enter new expense title:", expense.title);

    if (newTitle === null) {
        return;
    }

    expense.title = newTitle;

    fetch(API_URL + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
    })
    .then(response => response.json())
    .then(data => {
        alert("Expense updated successfully!");
        loadExpenses();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to update expense");
    });
}


// Delete Expense
function deleteExpense(id) {

    if (!confirm("Are you sure you want to delete this expense?")) {
        return;
    }

    fetch(API_URL + "/" + id, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {
        alert("Expense deleted successfully!");
        loadExpenses();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to delete expense");
    });
}