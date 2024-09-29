const expenseForm = document.getElementById('expense-form');
const balancesList = document.getElementById('balances-list');
let balances = {};

// Function to add expense
expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const expenseName = document.getElementById('expense-name').value;
  const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
  const participants = document.getElementById('participants').value.split(',').map(name => name.trim());
  const payments = document.getElementById('payments').value.split(',').map(payment => parseFloat(payment.trim()));

  // Total participants must match total payments
  if (participants.length !== payments.length) {
    alert('The number of participants must match the number of payments');
    return;
  }

  // Split the total evenly (you can modify to other methods)
  const perPersonAmount = expenseAmount / participants.length;

  // Calculate what each person owes based on their payment
  participants.forEach((participant, index) => {
    const payment = payments[index];
    const amountOwed = perPersonAmount - payment;

    // If participant doesn't exist in balances, initialize it
    if (!balances[participant]) {
      balances[participant] = 0;
    }
    balances[participant] += amountOwed;
  });

  updateBalances();
  expenseForm.reset();
});

// Function to update the UI with current balances
function updateBalances() {
  balancesList.innerHTML = '';
  for (let person in balances) {
    const listItem = document.createElement('li');
    const balance = balances[person].toFixed(2);

    // Update the UI to show how much each person owes
    if (balance > 0) {
      listItem.textContent = `${person} Should give: ₹${balance}`;
    } else if (balance < 0) {
      listItem.textContent = `${person} Should Receive: ₹${Math.abs(balance)}`;
    } else {
      listItem.textContent = `${person} is settled up.`;
    }

    balancesList.appendChild(listItem);
  }
}
