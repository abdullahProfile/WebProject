const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/submit-order', (req, res) => {
  const orderData = req.body;

  if (!orderData || !orderData.firstName || !orderData.secondName) {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  console.log('Received Order:', orderData);

  res.status(200).json({ message: 'Order placed successfully!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
