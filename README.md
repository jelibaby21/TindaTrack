Tinda Track: Inventory and Utang Management System for Sari-Sari Stores

1. Project Overview

Tinda Track is an Inventory and Utang Management System designed for sari-sari stores. It helps store owners manage products, inventory, customers, sales, purchases, and customer debts (utang) through a centralized system.

The system aims to make daily store operations more organized, accurate, and efficient.

2. Project Objectives

- Manage product information and categories.
- Monitor available inventory and stock movements.
- Record customer information and sales transactions.
- Manage customer debts and payments.
- Record supplier and purchase transactions.
- Generate reports using database JOIN operations.
- Provide a user-friendly interface for store management.

3. Technologies Used

- Database: MySQL
- Backend: Node.js and Express.js
- Frontend: HTML, CSS, and JavaScript
- API Architecture: REST API
- Development Tools: Visual Studio Code, MySQL Command Line Client, GitHub

4. System Features

User Management
Manage system users, roles, and account status.

Customer Management
Add, view, update, and manage customer information.

Product Management
Manage products, categories, units, and product information.

Inventory Management
Monitor inventory batches, stock quantities, and stock movements.

Sales Management
Record sales transactions and their corresponding items.

Debt / Utang Management
Record customer debts, payments, outstanding balances, and payment status.

Purchase Management
Record purchases from suppliers and manage purchase details.

Activity Logs
View recorded system activities.

Reports
Generate reports for users, sales, sales details, inventory, debts, purchases, and purchase details.

5. Group Members and Ownership Matrix

| Member | Assigned Tables | Backend Module | Frontend Screen | JOIN Report |
|---|---|---|---|---|
| Gianne Cadayona | users, roles, activity_logs | User Management | User Management | User JOIN Report |
| Angel Guinanas | products, categories, units | Product Management | Product Management | Product JOIN Report |
| Pritz Cabugnason | inventory_batches, stock_movements | Inventory Management | Inventory Management | Inventory JOIN Report |
| Jener Cabual | suppliers, purchases, purchase_items | Purchase Management | Purchase Management | Purchase JOIN Report |
| Algie Dorias | customers, sales, sale_items | Customer and Sales Management | Customer and Sales | Sales JOIN Report |
| Jellica Canoy | debts, debt_payments | Debt Management and System Integration | Debt Management and Reports | Debt JOIN Report |

6. Database Information

Database Name: `tinda_track`

The database contains 16 tables:

1. activity_logs
2. categories
3. customers
4. debt_payments
5. debts
6. inventory_batches
7. products
8. purchase_items
9. purchases
10. roles
11. sale_items
12. sales
13. stock_movements
14. suppliers
15. units
16. users

The database uses primary keys and foreign keys to establish relationships between related records.

7. Entity Relationship Diagram (ERD)

The following diagram illustrates the relationships among the database entities.

mermaid
erDiagram
    ROLES ||--o{ USERS : assigns
    USERS ||--o{ ACTIVITY_LOGS : records
    USERS ||--o{ SALES : handles
    USERS ||--o{ PURCHASES : creates
    USERS ||--o{ STOCK_MOVEMENTS : records

    CATEGORIES ||--o{ PRODUCTS : classifies
    UNITS ||--o{ PRODUCTS : measures
    SUPPLIERS ||--o{ PURCHASES : provides

    PRODUCTS ||--o{ INVENTORY_BATCHES : has
    PRODUCTS ||--o{ STOCK_MOVEMENTS : tracks
    PRODUCTS ||--o{ PURCHASE_ITEMS : included_in
    PRODUCTS ||--o{ SALE_ITEMS : included_in

    PURCHASES ||--|{ PURCHASE_ITEMS : contains
    SALES ||--|{ SALE_ITEMS : contains

    CUSTOMERS o|--o{ SALES : makes
    CUSTOMERS ||--o{ DEBTS : owes
    SALES o|--o{ DEBTS : may_create
    DEBTS ||--o{ DEBT_PAYMENTS : receives



8. Project Folder Structure

text
TindaTrack/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── js/
│   ├── index.html
│   ├── users.html
│   ├── customers.html
│   ├── products.html
│   ├── inventory.html
│   ├── sales.html
│   ├── debts.html
│   ├── purchases.html
│   ├── activity-logs.html
│   └── reports.html
│
├── database/
│   ├── tinda_track.sql
│   ├── tindatrack.sql
│   └── tinda_track_latest.sql
│
├── .gitignore
├── README.md
└── package-lock.json


9. How to Run the System

A. Database Setup

1. Open MySQL Command Line Client.
2. Log in to MySQL.
3. Create or select the database:

sql
CREATE DATABASE IF NOT EXISTS tinda_track;
USE tinda_track;


4. Import the latest SQL backup, `tinda_track_latest.sql`, if setting up the database on a new computer.

B. Backend Setup

1. Open the project folder in Visual Studio Code.
2. Open a terminal.
3. Navigate to the backend folder if its `package.json` is located there.
4. Install the required dependencies.
5. Configure the database connection using the appropriate local credentials.
6. Start the server:

bash
node server.js


The backend API runs at:

`http://localhost:3000`

C. Frontend Setup

1. Open the `frontend` folder in Visual Studio Code.
2. Open `index.html`.
3. Right-click the file.
4. Select Open with Live Server.

The frontend can then communicate with the backend API.

10. Reports and JOIN Operations

The system includes the following reports:

| Report | API Endpoint |
|---|---|
| User Report | `/api/reports/user-report` |
| Sales Report | `/api/reports/sales-report` |
| Sales Details Report | `/api/reports/sales-details-report` |
| Inventory Report | `/api/reports/inventory-report` |
| Debt Report | `/api/reports/debt-report` |
| Purchase Report | `/api/reports/purchase-report` |
| Purchase Details Report | `/api/reports/purchase-details-report` |

The project uses SQL JOIN operations to retrieve related information from multiple database tables.

The required JOIN demonstrations include:

- INNER JOIN
- LEFT JOIN
- RIGHT JOIN
- FULL OUTER JOIN equivalent using UNION, where supported by MySQL through a combination of LEFT and RIGHT JOIN queries.

11. API Modules

The backend provides REST API endpoints for managing the system's main resources, including:

- Users
- Customers
- Products
- Inventory
- Sales
- Debts
- Purchases
- Activity Logs
- Reports

The API supports the appropriate HTTP methods for retrieving, creating, updating, and deleting records.

12. GitHub Repository

Repository: https://github.com/jelibaby21/TindaTrack

This repository contains the source code, database scripts, and project documentation for Tinda Track.

13. Conclusion

Tinda Track provides a centralized solution for managing the daily operations of sari-sari stores. Through database management, backend integration, frontend interfaces, and report generation, the system aims to improve the accuracy and efficiency of inventory, sales, purchases, and customer debt management.
