const API = 'http://localhost:3000/api/customers';

function loadCustomers() {
  fetch(API)
    .then(response => response.json())
    .then(customers => {
      const table = document.getElementById('customerTable');
      table.innerHTML = '';

      customers.forEach(c => {
        table.innerHTML += `
          <tr>
            <td>${c.customer_id}</td>
            <td>${c.customer_name}</td>
            <td>${c.contact_number || ''}</td>
            <td>${c.address || ''}</td>
            <td>${c.status}</td>
            <td>
              <button onclick="editCustomer(${c.customer_id})">Edit</button>
              <button onclick="deleteCustomer(${c.customer_id})">Deactivate</button>
            </td>
          </tr>
        `;
      });
    })
    .catch(error => console.error('Error loading customers:', error));
}

document.getElementById('customerForm').addEventListener('submit', event => {
  event.preventDefault();

  const customer = {
    customer_name: document.getElementById('full_name').value,
    contact_number: document.getElementById('contact').value,
    address: document.getElementById('address').value,
    status: 'Active'
  };

  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer)
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      document.getElementById('customerForm').reset();
      loadCustomers();
    })
    .catch(error => console.error('Error adding customer:', error));
});

function editCustomer(id) {
  const newName = prompt('Enter new customer name:');
  if (!newName) return;

  fetch(API)
    .then(response => response.json())
    .then(customers => {
      const customer = customers.find(c => c.customer_id === id);

      if (!customer) {
        alert('Customer not found');
        return;
      }

      return fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: newName,
          contact_number: customer.contact_number || '',
          address: customer.address || '',
          status: customer.status
        })
      });
    })
    .then(response => {
      if (!response) return;
      return response.json();
    })
    .then(data => {
      if (!data) return;
      alert(data.message);
      loadCustomers();
    })
    .catch(error => console.error('Error updating customer:', error));
}

function deleteCustomer(id) {
  if (!confirm('Deactivate this customer?')) return;

  fetch(`${API}/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      loadCustomers();
    })
    .catch(error => console.error('Error deactivating customer:', error));
}

loadCustomers();