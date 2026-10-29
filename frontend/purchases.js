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
                        <td>${p.purchase_date}</td>
                        <td>${p.total_amount}</td>
                        <td>${p.status}</td>
                        <td>
                            <button onclick="cancelPurchase(${p.purchase_id})">Cancel</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('purchaseForm').addEventListener('submit', event => {
    event.preventDefault();

    const purchase = {
        supplier_id: document.getElementById('supplier_id').value,
        purchase_date: document.getElementById('purchase_date').value,
        total_amount: document.getElementById('total_amount').value,
        status: 'Completed'
    };

    fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchase)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('purchaseForm').reset();
        loadPurchases();
    });
});

function cancelPurchase(id) {
    if (!confirm('Cancel this purchase?')) return;

    fetch(`${API}/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadPurchases();
        });
}

loadPurchases();
