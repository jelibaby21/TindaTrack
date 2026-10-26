const API = 'http://localhost:3000/api/debts';

function formatDate(value) {
    return value ? new Date(value).toLocaleDateString('en-CA') : '';
}

function loadDebts() {
    fetch(API)
        .then(response => response.json())
        .then(debts => {
            const table = document.getElementById('debtTable');
            table.innerHTML = '';

            debts.forEach(d => {
                table.innerHTML += `
                    <tr>
                        <td>${d.debt_id}</td>
                        <td>${d.full_name || ''}</td>
                        <td>${d.amount}</td>
                        <td>${d.amount_paid}</td>
                        <td>${d.balance}</td>
                        <td>${d.status}</td>
                        <td>${formatDate(d.due_date)}</td>
                        <td>
                            <button onclick="makePayment(${d.debt_id}, ${d.balance})">
                                Pay
                            </button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

function loadAlerts() {
    fetch(`${API}/alerts`)
        .then(response => response.json())
        .then(alerts => {
            const table = document.getElementById('alertTable');
            table.innerHTML = '';

            alerts.forEach(a => {
                table.innerHTML += `
                    <tr>
                        <td>${a.debt_id}</td>
                        <td>${a.full_name}</td>
                        <td>${a.balance}</td>
                        <td>${formatDate(a.due_date)}</td>
                        <td>${a.alert_type}</td>
                        <td>${a.days_overdue > 0 ? a.days_overdue : ''}</td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('debtForm').addEventListener('submit', event => {
    event.preventDefault();

    const debt = {
        customer_id: document.getElementById('customer_id').value,
        amount: document.getElementById('amount').value,
        due_date: document.getElementById('due_date').value
    };

    fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(debt)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('debtForm').reset();
        loadDebts();
        loadAlerts();
    });
});

function makePayment(id, balance) {
    const amount = prompt(`Remaining balance: ${balance}\nEnter payment:`);

    if (amount === null || Number(amount) <= 0) return;

    fetch(`${API}/${id}/payment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadDebts();
        loadAlerts();
    });
}

loadDebts();
loadAlerts();