document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchContainer = document.querySelector('.search-container');
  const closeSearchButton = document.getElementById('closeSearch');
  const cardsSection = document.querySelector('.cards-section .cards-section__cards');

  const products = [
    { name: 'Syltherine', description: 'Stylish cafe chair', price: 'Rp 2.500.000', imgSrc: './assets/cards/cardOne.svg' },
    { name: 'Levisa', description: 'Stylish cafe chair', price: 'Rp 2.500.000', imgSrc: './assets/cards/cardTwo.svg' },
    { name: 'Lolito', description: 'Luxury big sofa', price: 'Rp 7.000.000', imgSrc: './assets/cards/cardThree.svg' },
    { name: 'Respira', description: 'Outdoor bar table and stool', price: 'Rp 500.000', imgSrc: './assets/cards/cardfour.svg' },
    { name: 'Grifo', description: 'Night lamp', price: 'Rp 1.500.000', imgSrc: './assets/cards/cardFive.svg' },
    { name: 'Muggo', description: 'Small mug', price: 'Rp 150.000', imgSrc: './assets/cards/cardSixth.svg' },
    { name: 'Pingky', description: 'Cute bed set', price: 'Rp 7.000.000', imgSrc: './assets/cards/cardSeven.svg' },
    { name: 'Potty', description: 'Minimalist flower pot', price: 'Rp 500.000', imgSrc: './assets/cards/cardEight.svg' },
  ];

  const filterProducts = (query) => {
    return products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
  };

  const displayAllProducts = () => {
    cardsSection.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-product-name', product.name);

      card.innerHTML = `
        <div class="discount">New</div>
        <button class="card_btn" onclick="addToCart('${product.name}', ${product.price.replace('Rp', '').replace('.', '')})">Add to cart</button>
        <div class="card-image">
          <a href="#"><img src="${product.imgSrc}" alt="image"></a>
        </div>
        <div class="card-text">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="card-text__price">
            <p>${product.price}</p>
          </div>
        </div>
      `;

      cardsSection.appendChild(card);
    });
  };

  const displaySearchResults = (results) => {
    searchResults.innerHTML = '';

    if (results.length > 0) {
      results.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        `;

        resultItem.addEventListener('click', () => {
          highlightProductOnPage(product.name);
        });

        searchResults.appendChild(resultItem);
      });
    } else {
      searchResults.innerHTML = '<p>No products found.</p>';
    }
  };

  const highlightProductOnPage = (productName) => {
    const highlightedCards = document.querySelectorAll('.card.highlight');
    highlightedCards.forEach(card => card.classList.remove('highlight'));

    const productCard = document.querySelector(`.card[data-product-name="${productName}"]`);
    if (productCard) {
      productCard.classList.add('highlight');
    }
  };

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      const results = filterProducts(query);
      displaySearchResults(results);
    } else {
      searchResults.innerHTML = '';
    }
  });

  closeSearchButton.addEventListener('click', () => {
    searchContainer.style.display = 'none';
  });

  window.searchIcon = () => {
    const isVisible = searchContainer.style.display === 'block';
    searchContainer.style.display = isVisible ? 'none' : 'block';
  };

  displayAllProducts();
});
