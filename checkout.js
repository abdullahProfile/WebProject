document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const submitButton = document.querySelector('#placeOrder'); // Make sure the ID matches

  // Function to get logged in user from localStorage
  const getLoggedInUser = () => {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null; // Return parsed user data or null if not found
  };

  // Function to validate the form
  const validateForm = () => {
    const firstName = document.getElementById('first_name').value.trim();
    const secondName = document.getElementById('second_name').value.trim();
    const street = document.getElementById('Street').value.trim();
    const town = document.getElementById('town').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const phone = document.getElementById('Phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!firstName || !secondName || !street || !town || !zip || !phone || !email) {
      alert('Please fill in all required fields.');
      return false;
    }

    return {
      firstName,
      secondName,
      companyName: document.getElementById('company_name').value.trim(),
      country: document.querySelector('select').value,
      street,
      town,
      zip,
      phone,
      email,
    };
  };

  // Submit button event listener
  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const loggedInUser = getLoggedInUser();
    console.log(loggedInUser); // Debugging line to ensure we're retrieving the user data

    // Check if user is logged in
    if (!loggedInUser || !loggedInUser.isLoggedIn) {
      alert('You must log in before placing an order.');
      return; // Prevent the form submission if not logged in
    }

    // Validate form data
    const orderData = validateForm();
    if (!orderData) return;

    orderData.user = loggedInUser;

    // Sending order data to the server
    try {
      const response = await fetch('http://localhost:5000/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Order placed successfully!');
        form.reset(); // Reset the form
      } else {
        alert('There was an issue placing your order.');
        console.error(result);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to the server.');
    }
  });
});
