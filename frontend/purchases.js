
const API = 'http://localhost:3000/api/purchases';

function loadPurchases() {
    fetch(API)
        .then(response => response.json())
        .then(purchases => {
            const table = document.getElementById('purchaseTable');
            table.innerHTML = '';

            purchases.forEach(p => {
                table.innerHTML += `
                    <tr>
                        <td>${p.purchase_id}</td>
                        <td>${p.supplier_name}</td>
                        <td>${new Date(p.purchase_date).toLocaleDateString()}</td>
                        <td>${p.total_amount}</td>
                        <td>Completed</td>
                        <td>
                            <button onclick="deletePurchase(${p.purchase_id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error loading purchases:', error));
}

document.getElementById('purchaseForm').addEventListener('submit', event => {
    event.preventDefault();

    const purchase = {
        supplier_id: document.getElementById('supplier_id').value,
        user_id: 1,
        purchase_date: document.getElementById('purchase_date').value,
        total_amount: document.getElementById('total_amount').value
    };

    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(purchase)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('purchaseForm').reset();
        loadPurchases();
    })
    .catch(error => console.error('Error adding purchase:', error));
});

function deletePurchase(id) {
    if (!confirm('Are you sure you want to delete this purchase?')) {
        return;
    }

    fetch(`${API}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadPurchases();
    })
    .catch(error => console.error('Error deleting purchase:', error));
}

loadPurchases();
