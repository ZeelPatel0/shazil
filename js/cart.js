/**
 * Luminous - Premium Handcrafted Candles
 * Shopping Cart JavaScript File
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the cart
    initCart();
});

// Initialize cart
function initCart() {
    // Get cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('luminousCart')) || [];
    
    // Update cart count
    updateCartCount(cart);
    
    // Render cart items
    renderCartItems(cart);
    
    // Make addToCart function available globally
    window.addToCart = addToCart;
}

// Add to cart function
function addToCart(product, quantity, size) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('luminousCart')) || [];
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && item.size === size
    );
    
    if (existingItemIndex > -1) {
        // Update quantity if product already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            size: size
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('luminousCart', JSON.stringify(cart));
    
    // Update cart UI
    updateCartCount(cart);
    renderCartItems(cart);
    
    // Show success message
    showNotification(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount(cart) {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Render cart items
function renderCartItems(cart) {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.querySelector('.total-amount');
    
    // Clear cart items container
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        // Show empty cart message
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
                <p>Add some products to your cart</p>
            </div>
        `;
        totalAmountElement.textContent = '$0.00';
        return;
    }
    
    // Calculate total amount
    const totalAmount = cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    
    // Update total amount
    totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
    
    // Render each cart item
    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <p class="cart-item-size">Size: ${getSizeLabel(item.size)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" data-index="${index}">
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Add event listeners for quantity buttons and remove buttons
    addCartItemEventListeners(cart);
}

// Add event listeners to cart items
function addCartItemEventListeners(cart) {
    // Quantity decrease buttons
    const decreaseButtons = document.querySelectorAll('.cart-item .decrease');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                updateCart(cart);
            }
        });
    });
    
    // Quantity increase buttons
    const increaseButtons = document.querySelectorAll('.cart-item .increase');
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            if (cart[index].quantity < 10) {
                cart[index].quantity++;
                updateCart(cart);
            }
        });
    });
    
    // Quantity input fields
    const quantityInputs = document.querySelectorAll('.cart-item .quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const index = parseInt(input.dataset.index);
            let value = parseInt(input.value);
            
            // Validate input value
            if (isNaN(value) || value < 1) {
                value = 1;
            } else if (value > 10) {
                value = 10;
            }
            
            cart[index].quantity = value;
            updateCart(cart);
        });
    });
    
    // Remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            cart.splice(index, 1);
            updateCart(cart);
        });
    });
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        // In a real application, this would redirect to a checkout page
        alert('Proceeding to checkout...');
        // For demo purposes, clear the cart after checkout
        clearCart();
    });
}

// Update cart in localStorage and UI
function updateCart(cart) {
    localStorage.setItem('luminousCart', JSON.stringify(cart));
    updateCartCount(cart);
    renderCartItems(cart);
}

// Clear cart
function clearCart() {
    localStorage.removeItem('luminousCart');
    updateCartCount([]);
    renderCartItems([]);
}

// Show notification
function showNotification(message) {
    // Check if notification container exists
    let notificationContainer = document.querySelector('.notification-container');
    
    // Create notification container if it doesn't exist
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.classList.add('notification-container');
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        </div>
        <button class="close-notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification to container
    notificationContainer.appendChild(notification);
    
    // Add event listener to close button
    const closeButton = notification.querySelector('.close-notification');
    closeButton.addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Get size label
function getSizeLabel(size) {
    switch (size) {
        case 'small':
            return 'Small (4 oz)';
        case 'medium':
            return 'Medium (8 oz)';
        case 'large':
            return 'Large (12 oz)';
        default:
            return size;
    }
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
    }
    
    .notification {
        background-color: var(--color-light);
        color: var(--color-dark);
        border-left: 4px solid var(--color-success);
        box-shadow: var(--shadow-medium);
        padding: 15px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        animation: slideIn 0.3s forwards;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
    }
    
    .notification-content i {
        color: var(--color-success);
        font-size: 1.2rem;
        margin-right: 10px;
    }
    
    .notification-content p {
        margin: 0;
    }
    
    .close-notification {
        background: none;
        border: none;
        color: var(--color-gray);
        cursor: pointer;
        font-size: 0.9rem;
    }
    
    .notification.fade-out {
        animation: slideOut 0.3s forwards;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .empty-cart {
        text-align: center;
        padding: 2rem 0;
    }
    
    .empty-cart i {
        font-size: 3rem;
        color: var(--color-light-gray);
        margin-bottom: 1rem;
    }
    
    .empty-cart p {
        color: var(--color-gray);
        margin-bottom: 0.5rem;
    }
`;

document.head.appendChild(notificationStyles);
