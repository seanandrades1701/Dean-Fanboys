const expenseForm = document.getElementById('expense-form');
const balancesList = document.getElementById('balances-list');
let balances = {};

// Function to add expense
expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const expenseName = document.getElementById('expense-name').value;
  const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
  const participants = document.getElementById('participants').value.split(',').map(name => name.trim());
  const splitMethod = document.getElementById('split-method').value;

  if (splitMethod === 'even') {
    const perPersonAmount = expenseAmount / participants.length;
    participants.forEach(participant => {
      if (!balances[participant]) {
        balances[participant] = 0;
      }
      balances[participant] += perPersonAmount;
    });
  }
  
  updateBalances();
  expenseForm.reset();
});

// Function to update the UI with current balances
function updateBalances() {
  balancesList.innerHTML = '';
  for (let person in balances) {
    const listItem = document.createElement('li');
    listItem.textContent = `${person}: $${balances[person].toFixed(2)}`;
    balancesList.appendChild(listItem);
  }
}
