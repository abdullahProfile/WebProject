const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
    process.exit(1);
  });

const orderSchema = new mongoose.Schema({
  firstName: String,
  secondName: String,
  companyName: String,
  country: String,
  street: String,
  town: String,
  zip: String,
  phone: String,
  email: String,
});

const Order = mongoose.model('Order', orderSchema);

app.post('/submit-order', (req, res) => {
  const orderData = req.body;

  const order = new Order(orderData);

  order.save()
    .then(() => {
      res.status(200).json({ message: 'Order placed successfully!' });
    })
    .catch((err) => {
      console.error('Error saving order:', err);
      res.status(500).json({ message: 'Error placing order', error: err });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
