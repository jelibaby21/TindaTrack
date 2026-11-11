const API = 'http://localhost:3000/api/products';
let editingProductId = null;

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
    supplier_id: document.getElementById('supplier_id').value,
    price: document.getElementById('price').value,
    status: document.getElementById('status').value
};


   
const url = editingProductId
    ? `${API}/${editingProductId}`
    : API;

const method = editingProductId ? 'PUT' : 'POST';

fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
})
.then(response => response.json())
.then(data => {
    alert(data.message);

    document.getElementById('productForm').reset();
    editingProductId = null;

    document.querySelector('#productForm button[type="submit"]').textContent = 'Add Product';

    loadProducts();
})
.catch(error => console.error('PRODUCT SAVE ERROR:', error))
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('productForm').reset();
        loadProducts();
    })
    .catch(error => console.error('ADD PRODUCT ERROR:', error));
});


function editProduct(id) {
    fetch(API)
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.product_id == id);

            if (!product) {
                alert('Product not found');
                return;
            }

            editingProductId = id;

            document.getElementById('product_name').value = product.product_name;
            document.getElementById('category_id').value = product.category_id;
            document.getElementById('unit_id').value = product.unit_id;
            document.getElementById('supplier_id').value = product.supplier_id;
            document.getElementById('price').value = product.price;
            document.getElementById('status').value = product.status;

            document.querySelector('#productForm button[type="submit"]').textContent = 'Update Product';
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


function loadCategories() {
    fetch('http://localhost:3000/api/categories')
        .then(response => response.json())
        .then(categories => {
            const select = document.getElementById('category_id');
            select.innerHTML = '<option value="">Select Category</option>';

            categories.forEach(category => {
                select.innerHTML += `
                    <option value="${category.category_id}">
                        ${category.category_name}
                    </option>
                `;
            });
        })
        .catch(error => console.error('CATEGORY ERROR:', error));
}

function loadUnits() {
    fetch('http://localhost:3000/api/units')
        .then(response => response.json())
        .then(units => {
            const select = document.getElementById('unit_id');
            select.innerHTML = '<option value="">Select Unit</option>';

            units.forEach(unit => {
                select.innerHTML += `
                    <option value="${unit.unit_id}">
                        ${unit.unit_name} (${unit.abbreviation})
                    </option>
                `;
            });
        })
        .catch(error => console.error('UNIT ERROR:', error));
}


function loadSuppliers() {
    fetch('http://localhost:3000/api/suppliers')
        .then(response => response.json())
        .then(suppliers => {
            const select = document.getElementById('supplier_id');
            select.innerHTML = '<option value="">Select Supplier</option>';

            suppliers.forEach(supplier => {
                select.innerHTML += `
                    <option value="${supplier.supplier_id}">
                        ${supplier.supplier_name}
                    </option>
                `;
            });
        })
        .catch(error => console.error('SUPPLIER ERROR:', error));
}

loadCategories();
loadUnits();
loadSuppliers();
loadProducts();
