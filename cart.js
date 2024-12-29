const cart = document.getElementById('cart');
const cartIcon = document.getElementById('cartIcon');
const closeCart = document.getElementById('closeCart');
const confirmOrder = document.getElementById('confirmOrder');
const cartItems = document.getElementById('cartItems');
const totalBill = document.getElementById('totalBill');

let total = 0; // Initialize total amount

// Open cart
cartIcon.addEventListener('click', () => {
  cart.classList.add('show');
});

// Close cart
closeCart.addEventListener('click', () => {
  cart.classList.remove('show'); // Ensure 'show' class is toggled correctly
});

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    ${itemName} - Rp ${itemPrice.toLocaleString()}
    <button onclick="removeItem(this, ${itemPrice})">&times;</button>
  `;

  cartItems.appendChild(listItem);

  total += itemPrice;
  totalBill.textContent = total.toLocaleString(); // Update total amount
}

// Function to remove items from the cart
function removeItem(button, itemPrice) {
  button.parentElement.remove();
  total -= itemPrice;
  totalBill.textContent = total.toLocaleString(); // Update total amount
}

// Confirm Order
confirmOrder.addEventListener('click', () => {
  if (total > 0) {
    alert("Order successfully placed!");
    cartItems.innerHTML = ''; // Clear cart items
    total = 0; // Reset total
    totalBill.textContent = '0';
  } else {
    alert("Your cart is empty. Add items to place an order.");
  }
});
