const cart = document.getElementById('cart');
const cartIconMobile = document.getElementById('cartIcon-mobile');
const cartIconDesktop = document.getElementById('cartIcon-desktop');
const closeCart = document.getElementById('closeCart');
const confirmOrder = document.getElementById('confirmOrder');
const cartItems = document.getElementById('cartItems');
const totalBill = document.getElementById('totalBill');

let total = 0;


cartIconMobile.addEventListener('click', (e) => {
  e.preventDefault();
  cart.classList.add('show');
});

cartIconDesktop.addEventListener('click', (e) => {
  e.preventDefault();
  cart.classList.add('show');
});

closeCart.addEventListener('click', () => {
  cart.classList.remove('show');
});


function addToCart(itemName, itemPrice) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    ${itemName} - Rp ${itemPrice.toLocaleString()}
    <button onclick="removeItem(this, ${itemPrice})">&times;</button>
  `;

  cartItems.appendChild(listItem);

  total += itemPrice;
  totalBill.textContent = total.toLocaleString();
}


function removeItem(button, itemPrice) {
  button.parentElement.remove();
  total -= itemPrice;
  totalBill.textContent = total.toLocaleString();
}


confirmOrder.addEventListener('click', () => {
  if (total > 0) {
    alert("Order successfully placed!");
    cartItems.innerHTML = '';
    total = 0;
    totalBill.textContent = '0';
  } else {
    alert("Your cart is empty. Add items to place an order.");
  }
});
