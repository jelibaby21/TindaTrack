const API = 'http://localhost:3000/api/sales';
const CUSTOMER_API = 'http://localhost:3000/api/customers';

function loadCustomers() {
  fetch(CUSTOMER_API)
    .then(response => response.json())
    .then(customers => {
      const select = document.getElementById('customer_id');

      customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.customer_id;
        option.textContent = customer.customer_name;
        select.appendChild(option);
      });
    })
    .catch(error => console.error('Error loading customers:', error));
}

function loadSales() {
  fetch(API)
    .then(response => response.json())
    .then(sales => {
      const table = document.getElementById('salesTable');
      table.innerHTML = '';

      sales.forEach(sale => {
        table.innerHTML += `
          <tr>
            <td>${sale.sale_id}</td>
            <td>${sale.customer_name || 'Walk-in'}</td>
            <td>${sale.user_id}</td>
            <td>${sale.sale_date}</td>
            <td>${sale.total_amount}</td>
            <td>${sale.payment_type}</td>
            <td>
              <button onclick="deleteSale(${sale.sale_id})">Delete</button>
            </td>
          </tr>
        `;
      });
    })
    .catch(error => console.error('Error loading sales:', error));
}

document.getElementById('salesForm').addEventListener('submit', event => {
  event.preventDefault();

  const sale = {
    customer_id: document.getElementById('customer_id').value || null,
    user_id: document.getElementById('user_id').value,
    sale_date: document.getElementById('sale_date').value,
    total_amount: document.getElementById('total_amount').value,
    payment_type: document.getElementById('payment_type').value
  };

  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sale)
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message || 'Request completed');
      document.getElementById('salesForm').reset();
      loadSales();
    })
    .catch(error => console.error('Error recording sale:', error));
});

function deleteSale(id) {
  if (!confirm('Are you sure you want to delete this sale?')) return;

  fetch(`${API}/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      alert(data.message || 'Request completed');
      loadSales();
    })
    .catch(error => console.error('Error deleting sale:', error));
}

loadCustomers();
loadSales();