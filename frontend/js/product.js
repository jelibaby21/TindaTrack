const API = 'http://localhost:3000/api/products';

function loadProducts() {
    fetch(API)
        .then(response => response.json())
        .then(products => {
            const table = document.getElementById('productTable');
            table.innerHTML = '';

            products.forEach(p => {
                table.innerHTML += `
                    <tr>
                        <td>${p.product_id}</td>
                        <td>${p.product_name}</td>
                        <td>${p.category_name || ''}</td>
                        <td>${p.unit_name || ''}</td>
                        <td>${p.price}</td>
                        <td>${p.status}</td>
                        <td>
                            <button onclick="editProduct(${p.product_id})">Edit</button>
                            <button onclick="deleteProduct(${p.product_id})">Deactivate</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('productForm').addEventListener('submit', event => {
    event.preventDefault();

    const product = {
        product_name: document.getElementById('product_name').value,
        category_id: document.getElementById('category_id').value,
        unit_id: document.getElementById('unit_id').value,
        price: document.getElementById('price').value,
        status: document.getElementById('status').value
    };

    fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('productForm').reset();
        loadProducts();
    })
    .catch(error => console.error('Error:', error));
});

function editProduct(id) {
    const name = prompt('Enter new product name:');
    if (!name) return;

    fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_name: name })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadProducts();
    });
}

function deleteProduct(id) {
    if (!confirm('Deactivate this product?')) return;

    fetch(`${API}/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadProducts();
        });
}

loadProducts();