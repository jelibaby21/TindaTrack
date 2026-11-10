const API = 'http://localhost:3000/api/products';

function loadProducts() {
    const table = document.getElementById('productTable');

    table.innerHTML = `
        <tr><td colspan="7">Loading products...</td></tr>
    `;

    fetch(API)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP Error: ' + response.status);
            }
            return response.json();
        })
        .then(products => {
            table.innerHTML = '';

            if (!Array.isArray(products)) {
                throw new Error('API did not return a product array');
            }

            if (products.length === 0) {
                table.innerHTML = `
                    <tr><td colspan="7">No products found.</td></tr>
                `;
                return;
            }

            products.forEach(p => {
                table.innerHTML += `
                    <tr>
                        <td>${p.product_id}</td>
                        <td>${p.product_name}</td>
                        <td>${p.category_name || ''}</td>
                        <td>${p.unit_name || ''}</td>
                        <td>${p.price || p.selling_price || '0.00'}</td>
                        <td>${p.status}</td>
                        <td>
                            <button onclick="editProduct(${p.product_id})">Edit</button>
                            <button onclick="deleteProduct(${p.product_id})">Deactivate</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('PRODUCTS ERROR:', error);

            table.innerHTML = `
                <tr>
                    <td colspan="7">Error loading products. Check Console.</td>
                </tr>
            `;
        });
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
    .catch(error => console.error('ADD PRODUCT ERROR:', error));
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
