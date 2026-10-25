const API = 'http://localhost:3000/api/inventory';

function loadInventory() {
    fetch(API)
        .then(response => response.json())
        .then(items => {
            const table = document.getElementById('inventoryTable');
            table.innerHTML = '';

            items.forEach(i => {
                table.innerHTML += `
                    <tr>
                        <td>${i.batch_id}</td>
                        <td>${i.product_name || ''}</td>
                        <td>${i.quantity}</td>
                        <td>${i.expiration_date || ''}</td>
                        <td>${i.status}</td>
                        <td>
                            <button onclick="editInventory(${i.batch_id}, ${i.quantity})">Edit</button>
                            <button onclick="deleteInventory(${i.batch_id})">Deactivate</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('inventoryForm').addEventListener('submit', event => {
    event.preventDefault();

    const item = {
        product_id: document.getElementById('product_id').value,
        quantity: document.getElementById('quantity').value,
        expiration_date: document.getElementById('expiration_date').value
    };

    fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('inventoryForm').reset();
        loadInventory();
    });
});

function editInventory(id, quantity) {
    const newQty = prompt('Enter new quantity:', quantity);
    if (newQty === null) return;

    fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            quantity: newQty,
            expiration_date: null,
            status: Number(newQty) <= 5 ? 'LOW STOCK' : 'Normal'
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadInventory();
    });
}

function deleteInventory(id) {
    if (!confirm('Deactivate this batch?')) return;

    fetch(`${API}/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadInventory();
        });
}

loadInventory();