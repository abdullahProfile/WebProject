document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginIcons = document.querySelectorAll('.login-icon');
  const loginMblIcons = document.querySelectorAll('.login-mbl');
  const loginButton = document.getElementById('login-btn');
  const placeOrderButton = document.querySelector('#placeOrder');
  const closeButton = document.getElementById('closeLoginForm');

  setTimeout(() => {
    loginForm.style.display = 'block';
  }, 3000);

  loginIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.style.display = 'block';
    });
  });


  loginMblIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.style.display = 'block';
    });
  });


  closeButton.addEventListener('click', () => {
    loginForm.style.display = 'none';
  });

  loginButton.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const password = document.getElementById('password').value.trim();

    if (name && password) {
      const userData = { name, isLoggedIn: true };
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
      alert('Login successful!');
      loginForm.style.display = 'none';
    } else {
      alert('Please fill in all fields.');
    }
  });

  if (placeOrderButton) {
    placeOrderButton.addEventListener('click', (e) => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!loggedInUser || !loggedInUser.isLoggedIn) {
        e.preventDefault();
        alert('You must log in before placing an order.');
      }
    });
  }
});
