Tinda Track
Inventory and Utang Management System for Sari-Sari Stores

1. Project Overview

Tinda Track is a web-based Inventory and Utang Management System designed to help sari-sari store owners manage their daily business operations.

The system provides an organized way to manage products, inventory, customers, sales, purchases, debts, payments, and activity logs. It also includes reports that help store owners monitor their transactions and inventory records.

2. Project Objectives

- To make product and inventory management easier.
- To monitor available stock and identify low-stock products.
- To organize customer information.
- To record and monitor sales transactions.
- To manage purchases from suppliers.
- To track customer debts and payments.
- To provide reports using database queries and JOIN operations.
- To improve the organization of sari-sari store operations.

3. Technologies Used

| Technology | Purpose |
|---|---|
| MySQL | Database management |
| Node.js | Backend runtime environment |
| Express.js | Backend API framework |
| HTML | Webpage structure |
| CSS | Webpage design |
| JavaScript | Frontend functionality |
| Visual Studio Code | Code editor |
| GitHub | Source code management and collaboration |

4. System Features

1. User Management – Manages system users and their roles.
2. Customer Management – Stores and manages customer information.
3. Product Management – Manages product records, categories, and units.
4. Inventory Management – Tracks product quantities and inventory batches.
5. Sales Management – Records customer and store sales transactions.
6. Debt / Utang Management – Tracks customer debts, payments, and balances.
7. Purchase Management – Records purchases from suppliers and purchase items.
8. Activity Logs – Records system activities.
9. Reports – Displays reports and related database information using JOIN queries.

5. Group Members and Ownership Matrix

| Member | Name | Assigned Tables | API Resource / Feature | Frontend Screen | JOIN Report |
|---|---|---|---|---|---|
| 1 | Gianne Cadayona | users, roles, activity_logs | User Management | User Management | User-related JOIN report |
| 2 | Angel Guinanas | products, categories, units | Product Management | Product Management | Product-related JOIN report |
| 3 | Pritz Cabugnason | inventory_batches, stock_movements | Inventory Management | Inventory Management | Inventory-related JOIN report |
| 4 | Jener Cabual | suppliers, purchases, purchase_items | Purchase Management | Purchase Management | Purchase-related JOIN report |
| 5 | Algie Dorias | customers, sales, sale_items | Customer and Sales Management | Customer and Sales | Sales-related JOIN report |
| 6 | Jellica Canoy | debts, debt_payments | Debt Management and System Integration | Debt Management and Reports | Debt-related JOIN report |


6. Database Information

Database Name:** `tinda_track`

The database contains 16 tables:

1. users
2. roles
3. activity_logs
4. products
5. categories
6. units
7. inventory_batches
8. stock_movements
9. suppliers
10. purchases
11. purchase_items
12. customers
13. sales
14. sale_items
15. debts
16. debt_payments

The database uses primary keys and foreign keys to establish relationships between related records.

7. Project Folder Structure

TindaTrack/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── database/
│   └── SQL database scripts
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
├── .gitignore
├── package-lock.json
└── README.md


8. How to Run the System

A. Database Setup

1. Open MySQL Command Line Client.
2. Log in to your MySQL account.
3. Create or select the `tinda_track` database.
4. Execute the SQL schema and sample-data scripts found in the `database` folder.
5. Make sure the database connection settings are configured correctly in the backend environment file.

B. Backend Setup

1. Open the TindaTrack project folder in Visual Studio Code.
2. Open a terminal in the project folder.
3. Install the required packages if they have not been installed:

bash
npm install


4. Start the backend server:

bash
cd backend
node server.js

5. Keep the backend terminal running.

C. Frontend Setup

1. Open the `frontend` folder in Visual Studio Code.
2. Open `index.html`.
3. Right-click the file.
4. Select **Open with Live Server**.
5. Use the dashboard to navigate through the system.

9. Reports and Database JOIN Operations

Tinda Track provides reports for retrieving related information from multiple database tables.

Available reports include:

- User Report
- Sales Report
- Sales Details Report
- Inventory Report
- Debt Report
- Purchase Report
- Purchase Details Report

The system also uses JOIN operations to retrieve related records from different tables, such as users, customers, products, suppliers, inventory, sales, purchases, and debts.

10. GitHub Repository

Repository: https://github.com/jelibaby21/TindaTrack

This repository contains the source code and project files for Tinda Track.


Project Title: Tinda Track: Inventory and Utang Management System for Sari-Sari Stores

Project Courses: Database Management System and System Integration Architecture
