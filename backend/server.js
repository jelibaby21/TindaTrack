
const express = require('express');
const db = require('./config/db');

const app = express();

app.use(express.json());

app.use(express.static('../frontend'));

const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

app.use('/api', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
    res.send('Tinda Track Backend is Running!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});