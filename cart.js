document.addEventListener('DOMContentLoaded', () => {
  const cart = document.getElementById('cart');
  const cartIconMobile = document.getElementById('cartIcon-mobile');
  const cartIconDesktop = document.getElementById('cartIcon-desktop');
  const closeCart = document.getElementById('closeCart');

  const cartItems = document.getElementById('cartItems');
  const totalBill = document.getElementById('totalBill');

  let total = 0;

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

  window.addToCart = (itemName, itemPrice) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="item-name">${itemName}</span> - Rp <span class="item-price">${itemPrice.toLocaleString()}</span>
      <div class="quantity-control">
        <button class="decrease" onclick="changeQuantity(this, -1, ${itemPrice})">-</button>
        <span class="quantity">1</span>
        <button class="increase" onclick="changeQuantity(this, 1, ${itemPrice})">+</button>
      </div>
      <button class="remove" onclick="removeItem(this, ${itemPrice})">&times;</button>
    `;
    cartItems.appendChild(listItem);

    total += itemPrice;
    totalBill.textContent = total.toLocaleString();
  };

  window.changeQuantity = (button, change, itemPrice) => {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity += change;

    if (quantity < 1) return;

    quantityElement.textContent = quantity;

    const priceDifference = change * itemPrice;
    total += priceDifference;
    totalBill.textContent = total.toLocaleString();
  };

  window.removeItem = (button, itemPrice) => {
    const quantity = parseInt(button.parentElement.querySelector('.quantity').textContent);
    button.parentElement.remove();

    total -= itemPrice * quantity;
    totalBill.textContent = total.toLocaleString();
  };
});
