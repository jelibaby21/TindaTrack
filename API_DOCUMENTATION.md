Tinda Track – API Documentation

1. Project Overview

**System Name:** Tinda Track: Inventory and Utang Management System for Sari-Sari Stores

Backend Technology: Node.js and Express.js  
Database: MySQL  
API Type: REST API  
Base URL: `http://localhost:3000`

This document lists the available API endpoints used by the Tinda Track system.

2. User Management API

Base Path:`/api/users`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Retrieve all users |
| POST | `/api/users` | Add a new user |
| PUT | `/api/users/:id` | Update a user |
| GET | `/api/users/report/join` | Retrieve user JOIN report |

3. Customer Management API

Base Path: `/api/customers`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/customers` | Retrieve all customers |
| POST | `/api/customers` | Add a customer |
| PUT | `/api/customers/:id` | Update a customer |
| DELETE | `/api/customers/:id` | Delete a customer |

4. Product Management API

Base Path: `/api/products`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Retrieve all products |
| POST | `/api/products` | Add a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/products/report/join` | Retrieve product JOIN report |

5. Inventory Management API

Base Path: `/api/inventory`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/inventory` | Retrieve inventory records |
| POST | `/api/inventory` | Add an inventory record |
| PUT | `/api/inventory/:id` | Update an inventory record |
| DELETE | `/api/inventory/:id` | Delete an inventory record |
| GET | `/api/inventory/report/join` | Retrieve inventory JOIN report |

6. Sales Management API

**Base Path:** `/api/sales`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/sales` | Retrieve all sales |
| POST | `/api/sales` | Record a sale |
| PUT | `/api/sales/:id` | Update a sale |
| DELETE | `/api/sales/:id` | Delete a sale |
| GET | `/api/sales/report/join` | Retrieve sales JOIN report |

7. Debt / Utang Management API

Base Path: `/api/debts`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/debts` | Retrieve all debts |
| GET | `/api/debts/alerts` | Retrieve debt alerts |
| POST | `/api/debts` | Add a debt |
| PUT | `/api/debts/:id/payment` | Record a debt payment |
| DELETE | `/api/debts/:id` | Delete a debt |
| GET | `/api/debts/report/join` | Retrieve debt JOIN report |

8. Purchase Management API

**Base Path:** `/api/purchases`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/purchases` | Retrieve all purchases |
| POST | `/api/purchases` | Add a purchase |
| PUT | `/api/purchases/:id` | Update a purchase |
| DELETE | `/api/purchases/:id` | Delete a purchase |
| GET | `/api/purchases/report/join` | Retrieve purchase JOIN report |

9. Activity Logs API

Base Path: `/api/activity-logs`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/activity-logs` | Retrieve activity logs |
| POST | `/api/activity-logs` | Add an activity log |

10. Reports API

Base Path: `/api/reports`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reports/user-report` | Retrieve user report |
| GET | `/api/reports/sales-report` | Retrieve sales report |
| GET | `/api/reports/sales-details-report` | Retrieve sales details report |
| GET | `/api/reports/inventory-report` | Retrieve inventory report |
| GET | `/api/reports/debt-report` | Retrieve debt report |
| GET | `/api/reports/purchase-report` | Retrieve purchase report |
| GET | `/api/reports/purchase-details-report` | Retrieve purchase details report |

11. HTTP Methods

- **GET** – Retrieves records or reports.
- **POST** – Creates a new record.
- **PUT** – Updates an existing record or records a debt payment.

12. Common HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Record successfully created |
| 400 | Invalid request or missing required fields |
| 404 | Requested record not found |
| 500 | Internal server or database error |

13. Testing the API

The endpoints can be tested using a web browser for GET requests or an API testing tool such as Postman for GET, POST, PUT, and DELETE requests.

Example GET requests:

- `http://localhost:3000/api/users`
- `http://localhost:3000/api/customers`
- `http://localhost:3000/api/products`
- `http://localhost:3000/api/inventory`
- `http://localhost:3000/api/sales`
- `http://localhost:3000/api/debts`
- `http://localhost:3000/api/purchases`
- `http://localhost:3000/api/activity-logs`

14. Notes

- Start the backend server before testing the API.
- The backend runs on port 3000.
- Replace `:id` in an endpoint with the actual record ID.
- Some endpoints require JSON request bodies.
- The available endpoints are based on the Express route definitions in the project repository.
