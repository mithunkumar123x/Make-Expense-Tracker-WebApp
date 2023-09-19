document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get expense details from the form
    var expenseName = document.getElementById('expenseName').value;
    var expenseAmount = document.getElementById('expenseAmount').value;
    var expenseDescription = document.getElementById('expenseDescription').value;
    var expenseCategory = document.getElementById('expenseCategory').value;
  
    // Create an expense object
    var expense = {
      name: expenseName,
      amount: expenseAmount,
      description: expenseDescription,
      category: expenseCategory
    };
  
    // Get the existing expenses from local storage
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Add the new expense to the array
    expenses.push(expense);
  
    // Save the updated expenses array to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Clear the form inputs
    
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseCategory').value = '';
  
    // Refresh the expense list
    displayExpenses();
  });
  
  function displayExpenses() {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
  
    expenses.forEach(function(expense, index) {
      var expenseItem = document.createElement('div');
      expenseItem.classList.add('expense-item');
      expenseItem.innerHTML = `
        <strong>${expense.name}</strong>: 
        Amount: $${expense.amount}, 
        Description: ${expense.description}, 
        Category: ${expense.category}
        <button class="btn btn-sm btn-primary edit-btn" data-index="${index}">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
      `;
  
      expenseList.appendChild(expenseItem);
    });
  
    // Add event listeners for edit and delete buttons

    var editButtons = document.getElementsByClassName('edit-btn');
    for (var i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener('click', editExpense);
    }
  
    var deleteButtons = document.getElementsByClassName('delete-btn');
    for (var i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', deleteExpense);
    }
  }
  
  function editExpense() {
    var index = this.getAttribute('data-index');
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var expense = expenses[index];
  
    // Set the form values to the selected expense
    document.getElementById('expenseName').value = expense.name;
    document.getElementById('expenseAmount').value = expense.amount;
    document.getElementById('expenseDescription').value = expense.description;
    document.getElementById('expenseCategory').value = expense.category;
  
    // Remove the selected expense from the array
    expenses.splice(index, 1);
  
    // Save the updated expenses array to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Refresh the expense list
    displayExpenses();
  }
  
  function deleteExpense() {
    var index = this.getAttribute('data-index');
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Remove the selected expense from the array
    expenses.splice(index, 1);
  
    // Save the updated expenses array to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Refresh the expense list
    displayExpenses();
  }
  
  // Display the existing expenses when the page loads
  displayExpenses();
  