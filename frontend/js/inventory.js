
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
                        <td>${i.expiration_date ? i.expiration_date.substring(0, 10) : 'N/A'}</td>
                        <td>${i.status}</td>
                        <td>
                            <button onclick="editInventory(${i.batch_id}, ${i.quantity})">Edit</button>
                            <button onclick="deleteInventory(${i.batch_id})">Deactivate</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Load inventory error:', error);
            alert('Failed to load inventory.');
        });
}

document.getElementById('inventoryForm').addEventListener('submit', event => {
    event.preventDefault();

    const item = {
        product_id: document.getElementById('product_id').value,
        quantity: document.getElementById('quantity').value,
        expiration_date: document.getElementById('expiration_date').value || null
    };

    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                console.error('Server error:', data);
                alert('Error: ' + (data.message || 'Failed to add inventory.'));
                return;
            }

            alert(data.message || 'Inventory added successfully.');
            document.getElementById('inventoryForm').reset();
            loadInventory();
        })
        .catch(error => {
            console.error('Request error:', error);
            alert('Cannot connect to the server. Check if the backend is running.');
        });
});

function editInventory(id, quantity) {
    const newQty = prompt('Enter new quantity:', quantity);

    if (newQty === null) return;

    if (newQty.trim() === '' || Number(newQty) < 0 || !Number.isFinite(Number(newQty))) {
        alert('Please enter a valid quantity.');
        return;
    }

    fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantity: Number(newQty),
            expiration_date: null,
            status: Number(newQty) <= 5 ? 'LOW STOCK' : 'Normal'
        })
    })
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                console.error('Update error:', data);
                alert('Error: ' + (data.message || 'Failed to update inventory.'));
                return;
            }

            alert(data.message || 'Inventory updated successfully.');
            loadInventory();
        })
        .catch(error => {
            console.error('Update request error:', error);
            alert('Cannot connect to the server.');
        });
}

function deleteInventory(id) {
    if (!confirm('Deactivate this batch?')) return;

    fetch(`${API}/${id}`, {
        method: 'DELETE'
    })
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                console.error('Deactivate error:', data);
                alert('Error: ' + (data.message || 'Failed to deactivate inventory.'));
                return;
            }

            alert(data.message || 'Inventory deactivated successfully.');
            loadInventory();
        })
        .catch(error => {
            console.error('Deactivate request error:', error);
            alert('Cannot connect to the server.');
        });
}

loadInventory();
