document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const submitButton = document.querySelector('#confirmOrder'); // Assuming confirm button has this ID

  const validateForm = () => {
    const firstName = document.getElementById('first_name').value.trim();
    const secondName = document.getElementById('second_name').value.trim();
    const street = document.getElementById('Street').value.trim();
    const town = document.getElementById('town').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const phone = document.getElementById('Phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!firstName || !secondName || !street || !town || !zip || !phone || !email) {
      alert("Please fill all required fields to proceed with the order.");
      return false;
    }

    const orderData = {
      firstName,
      secondName,
      companyName: document.getElementById('company_name').value.trim(),
      country: document.querySelector('select').value,
      street,
      town,
      zip,
      phone,
      email
    };

    console.log('Order Data:', orderData);

    // Send data to the server (backend)
    fetch('http://localhost:5000/saveOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Order saved:', data);
      alert('Your order has been placed successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an issue placing your order.');
    });

    return true;
  };

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (validateForm()) {
      form.submit();
    }
  });
});
