document.addEventListener('DOMContentLoaded', () => {
  const cart = document.getElementById('cart');
  const cartIconMobile = document.getElementById('cartIcon-mobile');
  const cartIconDesktop = document.getElementById('cartIcon-desktop');
  const closeCart = document.getElementById('closeCart');

  const cartItems = document.getElementById('cartItems');
  const totalBill = document.getElementById('totalBill');

  let total = 0;

  // Open and close the cart
  const toggleCartVisibility = (action) => {
    if (action === 'open') {
      cart.classList.add('show');
    } else if (action === 'close') {
      cart.classList.remove('show');
    }
  };

  cartIconMobile.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCartVisibility('open');
  });

  cartIconDesktop.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCartVisibility('open');
  });

  closeCart.addEventListener('click', () => {
    toggleCartVisibility('close');
  });

  // Add item to the cart
  window.addToCart = (itemName, itemPrice) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${itemName} - Rp ${itemPrice.toLocaleString()}
      <button onclick="removeItem(this, ${itemPrice})">&times;</button>
    `;
    cartItems.appendChild(listItem);

    total += itemPrice;
    totalBill.textContent = total.toLocaleString();
  };

  // Remove item from the cart
  window.removeItem = (button, itemPrice) => {
    button.parentElement.remove();
    total -= itemPrice;
    totalBill.textContent = total.toLocaleString();
  };
});
