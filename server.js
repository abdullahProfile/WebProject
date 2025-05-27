const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const ordersFilePath = path.join(__dirname, 'orders.json');

// GET route for testing
app.get('/submit-order', (req, res) => {
  res.send('GET request received at /submit-order. Use POST to submit an order.');
});

// GET all saved orders
app.get('/orders', (req, res) => {
  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    if (err) {
      // If file doesn't exist yet, return empty array
      if (err.code === 'ENOENT') return res.json([]);
      return res.status(500).json({ message: 'Failed to read orders' });
    }
    try {
      const orders = JSON.parse(data);
      res.json(orders);
    } catch {
      res.status(500).json({ message: 'Failed to parse orders' });
    }
  });
});

// POST new order and save it
app.post('/submit-order', (req, res) => {
  const orderData = req.body;

  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    let orders = [];
    if (!err && data) {
      try {
        orders = JSON.parse(data);
      } catch {
        // ignore parsing errors and start fresh
      }
    }

    orders.push(orderData);

    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        console.error('Error saving order:', err);
        return res.status(500).json({ message: 'Failed to save order' });
      }
      res.status(200).json({ message: 'Order saved successfully!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
