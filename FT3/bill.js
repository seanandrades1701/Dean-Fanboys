document.getElementById('add').addEventListener('click', addInput);
document.getElementById('calculate').addEventListener('click', calculateSplit);

function addInput() {
    const inputsDiv = document.getElementById('inputs');
    const newInputGroup = document.createElement('div');
    newInputGroup.classList.add('input-group');
    newInputGroup.innerHTML = `
        <input type="text" placeholder="Name" class="name">
        <input type="number" placeholder="Item Count" class="item-count" min="0">
        <input type="number" placeholder="Total Amount" class="total-amount" min="0" step="0.01">
        <button class="remove">Remove</button>
    `;
    inputsDiv.appendChild(newInputGroup);

    newInputGroup.querySelector('.remove').addEventListener('click', () => {
        inputsDiv.removeChild(newInputGroup);
    });
}

function calculateSplit() {
    const inputGroups = document.querySelectorAll('.input-group');
    const results = {};
    let totalItems = 0;
    let totalAmount = 0;

    inputGroups.forEach(group => {
        const name = group.querySelector('.name').value;
        const itemCount = parseInt(group.querySelector('.item-count').value) || 0;
        const total = parseFloat(group.querySelector('.total-amount').value) || 0;

        if (name) {
            results[name] = { itemCount, total };
            totalItems += itemCount;
            totalAmount += total;
        }
    });

    const perItemCost = totalAmount / totalItems;
    const output = document.getElementById('results');
    output.innerHTML = '';

    for (const [name, { itemCount, total }] of Object.entries(results)) {
        const amountOwed = itemCount * perItemCost;
        const difference = total - amountOwed;

        if (difference > 0) {
            output.innerHTML += `<p>${name} should receive $${difference.toFixed(2)}</p>`;
        } else if (difference < 0) {
            output.innerHTML += `<p>${name} should pay $${Math.abs(difference).toFixed(2)}</p>`;
        } else {
            output.innerHTML += `<p>${name} is even.</p>`;
        }
    }
}
