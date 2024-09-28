const form = document.getElementById('bill-form');
const tableBody = document.getElementById('consumption-table-body');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const totalBill = document.getElementById('total-bill').value;
    const numPeople = document.getElementById('people').value;
    const consumptionRows = tableBody.rows;

    let totalConsumption = 0;
    let consumptionArray = [];

    // calculate total consumption and store individual consumptions
    for (let i = 0; i < consumptionRows.length; i++) {
        const consumptionAmount = consumptionRows[i].cells[1].getElementsByTagName('input')[0].value;
        totalConsumption += parseFloat(consumptionAmount);
        consumptionArray.push(parseFloat(consumptionAmount));
    }

    // calculate each person's share
    const share = totalBill / totalConsumption;
    let resultsHTML = '';

    for (let i = 0; i < consumptionRows.length; i++) {
        const personName = consumptionRows[i].cells[0].getElementsByTagName('input')[0].value;
        const personShare = consumptionArray[i] * share;
        resultsHTML += <p>${personName} should pay $${personShare.toFixed(2)}</p>;
    }

    resultsDiv.innerHTML = resultsHTML;
    resultsDiv.style.opacity = 0; // set opacity to 0 before animation
    setTimeout(() => {
        resultsDiv.style.opacity = 1; // animate opacity to 1
    }, 100);
});

// dynamically generate table rows based on number of people
document.getElementById('people').addEventListener('input', () => {
    const numPeople = document.getElementById('people').value;
    tableBody.innerHTML = '';

    for (let i = 0; i < numPeople; i++) {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td><input type="text" placeholder="Name" required></td>
            <td><input type="number" placeholder="Consumption Amount" required></td>
        `;
    }
});