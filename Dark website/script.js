// Initialize cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to cart with selected quantity
function addToCart(product, price, quantity, image) {
    quantity = parseInt(quantity); // Convert quantity to a number
    let item = cart.find(item => item.name === product);

    if (item) {
        item.quantity += quantity; // Add selected quantity if item exists
    } else {
        cart.push({ name: product, price: price, quantity: quantity, image: image }); // Add new item with image
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    updateCartCount(); // Update cart count badge
}

// Function to update the cart count badge
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

// Display cart items with images, total amount, and grand total
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    cartItemsDiv.innerHTML = '';
    cartTotalDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let grandTotal = 0;

        cart.forEach((item, index) => {
            let totalAmount = item.price * item.quantity;
            grandTotal += totalAmount;

            cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="product-image">
                    <p>${item.name} - $${item.price} x ${item.quantity} = $${totalAmount}</p>
                    <button onclick="increaseQuantity(${index})">+</button>
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <button onclick="removeItem(${index})">🗑️</button>
                </div>
                <hr class="product-line">
            `;
        });

        // Display Grand Total
        cartTotalDiv.innerHTML = `
            <hr>
            <p><strong>Grand Total: $${grandTotal}</strong></p>
        `;
    }
}

// Increase, decrease, and remove item functions
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeItem(index);
    }
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update localStorage and refresh displayed items
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Load cart items and count badge on page load
if (document.getElementById('cart-items')) {
    displayCartItems();
}
updateCartCount();

//  
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add some items before proceeding to checkout.');
        return false;  // Prevent redirection
    }
    return true;  // Allow redirection if cart is not empty
}
