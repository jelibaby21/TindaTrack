const express = require('express');
const db = require('./config/db');

const app = express();

app.use(express.json());

app.use(express.static('../frontend'));

const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

const customerRoutes = require('./routes/customerRoutes');

const salesRoutes = require('./routes/salesRoutes');

const debtRoutes = require('./routes/debtRoutes');

const activityLogsRoutes = require('./routes/activityLogRoutes');
const productRoutes = require('./routes/productRoutes');
const purchaseRoutes = require('./purchaseRoutes');

app.use('/api', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/inventory', inventoryRoutes);

app.use('/api/customers', customerRoutes);

app.use('/api/sales', salesRoutes);
app.use('/api/debts', debtRoutes);

app.use('/api/activity-logs', activityLogsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchaseRoutes);

app.get('/', (req, res) => {
    res.send('Tinda Track Backend is Running!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
