const products = [
    { id: 1, title: "T-shirt", price: 15, category: "clothing", image: "https://picsum.photos/150?random=1" },
    { id: 2, title: "Jeans", price: 35, category: "clothing", image: "https://picsum.photos/150?random=2" },
    { id: 3, title: "Sneakers", price: 60, category: "footwear", image: "https://picsum.photos/150?random=3" },
    { id: 4, title: "Watch", price: 120, category: "accessories", image: "https://picsum.photos/150?random=4" },
    { id: 5, title: "Backpack", price: 40, category: "bags", image: "https://picsum.photos/150?random=5" },
    { id: 6, title: "Sunglasses", price: 25, category: "accessories", image: "https://picsum.photos/150?random=6" },
    { id: 7, title: "Hat", price: 10, category: "clothing", image: "https://picsum.photos/150?random=7" },
    { id: 8, title: "Jacket", price: 80, category: "clothing", image: "https://picsum.photos/150?random=8" },
    { id: 9, title: "Sandals", price: 20, category: "footwear", image: "https://picsum.photos/150?random=9" },
    { id: 10, title: "Laptop Bag", price: 55, category: "bags", image: "https://picsum.photos/150?random=10" },
    { id: 11, title: "Belt", price: 18, category: "accessories", image: "https://picsum.photos/150?random=11" },
    { id: 12, title: "Wallet", price: 22, category: "accessories", image: "https://picsum.photos/150?random=12" },
    { id: 13, title: "Formal Shoes", price: 75, category: "footwear", image: "https://picsum.photos/150?random=13" },
    { id: 14, title: "Hoodie", price: 30, category: "clothing", image: "https://picsum.photos/150?random=14" },
    { id: 15, title: "Scarf", price: 12, category: "accessories", image: "https://picsum.photos/150?random=15" },
    { id: 16, title: "Running Shoes", price: 65, category: "footwear", image: "https://picsum.photos/150?random=16" },
    { id: 17, title: "Duffel Bag", price: 45, category: "bags", image: "https://picsum.photos/150?random=17" },
    { id: 18, title: "Graphic Tee", price: 20, category: "clothing", image: "https://picsum.photos/150?random=18" },
    { id: 19, title: "Raincoat", price: 50, category: "clothing", image: "https://picsum.photos/150?random=19" },
    { id: 20, title: "Cap", price: 9, category: "clothing", image: "https://picsum.photos/150?random=20" }
];
let currentPage = 1;
const itemsPerPage = 6;

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];


function renderProductPage(page) {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const selectedSort = document.getElementById('sortPrice').value;

    // Filter 
    const filteredProducts = selectedCategory === 'all'
        ? products.slice()
        : products.filter(p => p.category === selectedCategory);

    // Sort
    if (selectedSort === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    // Pagination 
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const productsToShow = filteredProducts.slice(start, end);

    // Render products
    const container = document.querySelector('#product-container');
    container.innerHTML = '';

    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            <button class="wishlist-btn" data-id="${product.id}">
                ❤️ ${wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
        `;
        container.appendChild(card);
    });

    // Update page info
    document.getElementById('pageInfo').textContent = 
        `Page ${page} of ${Math.ceil(filteredProducts.length / itemsPerPage)}`;

    // Attach event listeners after rendering
    attachCartListeners();
    attachWishlistListeners();
}

// Event listeners for pagination buttons
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderProductPage(currentPage);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredLength = selectedCategory === 'all'
        ? products.length
        : products.filter(p => p.category === selectedCategory).length;

    const totalPage = Math.ceil(filteredLength / itemsPerPage);

    if (currentPage < totalPage) {
        currentPage++;
        renderProductPage(currentPage);
    }
});

// Initialize category dropdown
const categories = ['all', ...new Set(products.map(p => p.category))];
const categoryDropdown = document.getElementById('categoryFilter');

categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryDropdown.appendChild(option);
});

// Re-render on category or sort change
categoryDropdown.addEventListener('change', () => {
    currentPage = 1;
    renderProductPage(currentPage);
});
document.getElementById('sortPrice').addEventListener('change', () => {
    currentPage = 1;
    renderProductPage(currentPage);
});

// Add to cart event attachment
function attachCartListeners() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

// Wishlist toggle event attachment
function attachWishlistListeners() {
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            toggleWishlist(productId);
            renderProductPage(currentPage); // re-render to update wishlist button text
        });
    });
}

// Add product to cart logic
function addToCart(productId) {
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Render cart contents
function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <p>${product.title} (x${item.quantity}) - $${itemTotal}</p>
            <button onclick="removeFromCart(${product.id})">Remove</button>
        `;
        cartContainer.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    cartContainer.appendChild(totalDiv);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Wishlist toggle logic
function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
    } else {
        wishlist.push(productId);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Initial render calls
renderProductPage(currentPage);
renderCart();

// === MODAL TOGGLE HELPERS ===
function toggleModal(modalId, show = true) {
  document.getElementById(modalId).classList.toggle('hidden', !show);
}

// Open buttons
document.getElementById('openLoginBtn').addEventListener('click', () => toggleModal('loginModal', true));
document.getElementById('openSignupBtn').addEventListener('click', () => toggleModal('signupModal', true));

// Close buttons
document.getElementById('closeLoginBtn').addEventListener('click', () => toggleModal('loginModal', false));
document.getElementById('closeSignupBtn').addEventListener('click', () => toggleModal('signupModal', false));

document.getElementById('signupForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = document.querySelector('#signupEmail').value.trim();
    const password = document.querySelector('#signupPassword').value;
    signUp(email,password)
});
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  login(email, password);
});

function signUp(email,password){
const users = JSON.parse(localStorage.getItem('users'))||[]
const existinguser = users.find(user=>user.email===email);
if (existinguser)
{
 alert('Email already registered. Please log in.');
    return;
}
const newuser= {email,password}
users.push(newuser)
localStorage.setItem('users',JSON.stringify(users))
localStorage.setItem('currentUser',JSON.stringify(newuser))
UpdateAuthUi()
toggleModal('signupModal',false)
}
function UpdateAuthUi(){
    const currentUser =JSON.parse(localStorage.getItem('currentUser'))
      const userInfo = document.getElementById('userInfo');
      if(currentUser){
        userInfo.innerHTML=`Welcome ${currentUser.email} <button onclick="logout()"> Logout</button>`
        document.body.classList.add('logged-in');
  } else {
    userInfo.innerHTML = '';
    document.body.classList.remove('logged-in');
  }
}
function logout() {
  localStorage.removeItem('currentUser');
  UpdateAuthUi();
}
function login(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const matchedUser = users.find(user => user.email === email && user.password === password);

  if (!matchedUser) {
    alert('Invalid email or password.');
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(matchedUser));
  UpdateAuthUi();
  toggleModal('loginModal', false);
}
