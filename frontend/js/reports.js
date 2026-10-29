const baseURL = 'http://localhost:3000/api/reports';


// USER REPORT
function loadUserReport() {
    fetch(`${baseURL}/user-report`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('reportTable');

            table.innerHTML = '';

            data.forEach(user => {
                table.innerHTML += `
                    <tr>
                        <td>${user.user_id}</td>
                        <td>${user.username}</td>
                        <td>${user.full_name}</td>
                        <td>${user.role_name}</td>
                        <td>${user.status}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('User Report Error:', error);
        });
}


// REPORT 1 — SALES REPORT
function loadSalesReport() {
    fetch(`${baseURL}/sales-report`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('salesReport');

            table.innerHTML = '';

            data.forEach(sale => {
                table.innerHTML += `
                    <tr>
                        <td>${sale['Sale ID']}</td>
                        <td>${sale['Customer'] || ''}</td>
                        <td>${sale['User']}</td>
                        <td>${sale['Sale Date']}</td>
                        <td>${sale['Total Amount']}</td>
                        <td>${sale['Payment Type']}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Sales Report Error:', error);
        });
}


// REPORT 2 — SALES DETAILS
function loadSalesDetailsReport() {
    fetch(`${baseURL}/sales-details-report`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('salesDetailsReport');

            table.innerHTML = '';

            data.forEach(item => {
                table.innerHTML += `
                    <tr>
                        <td>${item['Sale ID']}</td>
                        <td>${item['Product']}</td>
                        <td>${item['Quantity']}</td>
                        <td>${item['Unit Price']}</td>
                        <td>${item['Subtotal']}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Sales Details Report Error:', error);
        });
}


// REPORT 3 — INVENTORY
function loadInventoryReport() {
    fetch(`${baseURL}/inventory-report`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('inventoryReport');

            table.innerHTML = '';

            data.forEach(item => {
                table.innerHTML += `
                    <tr>
                        <td>${item['Batch ID']}</td>
                        <td>${item['Product']}</td>
                        <td>${item['Quantity']}</td>
                        <td>${item['Unit']}</td>
                        <td>${item['Received Date']}</td>
                        <td>${item['Expiration Date'] || ''}</td>
                        <td>${item['Status']}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Inventory Report Error:', error);
        });
}


// REPORT 4 — DEBT
function loadDebtReport() {
    fetch(`${baseURL}/debt-report`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('debtReport');

            table.innerHTML = '';

            data.forEach(debt => {
                table.innerHTML += `
                    <tr>
                        <td>${debt['Debt ID']}</td>
                        <td>${debt['Customer']}</td>
                        <td>${debt['Debt Date']}</td>
                        <td>${debt['Due Date']}</td>
                        <td>${debt['Amount']}</td>
                        <td>${debt['Amount Paid']}</td>
                        <td>${debt['Balance']}</td>
                        <td>${debt['Status']}</td>
                        <td>${debt['Payment Date'] || ''}</td>
                        <td>${debt['Payment Amount'] || ''}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Debt Report Error:', error);
        });
}


// REPORT 5 — PURCHASE
function loadPurchaseReport() {
    fetch(`${baseURL}/purchase-report`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('purchaseReport');

            table.innerHTML = '';

            data.forEach(purchase => {
                table.innerHTML += `
                    <tr>
                        <td>${purchase['Purchase ID']}</td>
                        <td>${purchase['Supplier']}</td>
                        <td>${purchase['User']}</td>
                        <td>${purchase['Purchase Date']}</td>
                        <td>${purchase['Total Amount']}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Purchase Report Error:', error);
        });
}


// REPORT 6 — PURCHASE DETAILS
function loadPurchaseDetailsReport() {
    fetch(`${baseURL}/purchase-details-report`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('purchaseDetailsReport');

            table.innerHTML = '';

            data.forEach(item => {
                table.innerHTML += `
                    <tr>
                        <td>${item['Purchase ID']}</td>
                        <td>${item['Product']}</td>
                        <td>${item['Quantity']}</td>
                        <td>${item['Unit Cost']}</td>
                        <td>${item['Subtotal']}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Purchase Details Report Error:', error);
        });
}