/**
 * Luminous - Premium Handcrafted Candles
 * Main JavaScript File
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the website
    initLoader();
    initNavigation();
    initScrollEffects();
    initTestimonialSlider();
    loadProducts();
});

// Preloader
function initLoader() {
    const loader = document.querySelector('.loader');
    
    // Hide loader after page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove loader from DOM after animation completes
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000); // Show loader for at least 1 second
    });
}

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const continueShopping = document.querySelector('.continue-shopping');
    
    // Change header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Cart sidebar toggle
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
        document.body.classList.add('no-scroll');
    });
    
    // Close cart sidebar
    function closeCartSidebar() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }
    
    closeCart.addEventListener('click', closeCartSidebar);
    continueShopping.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
}

// Scroll effects
function initScrollEffects() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function reveal() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Check on initial load
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    // Show initial testimonial
    testimonials[0].classList.add('active');
    
    // Function to show testimonial by index
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Click event for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto slide
    function autoSlide() {
        const newIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(newIndex);
    }
    
    // Set interval for auto slide
    const slideInterval = setInterval(autoSlide, 5000);
    
    // Pause auto slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
}

// Get product data
function getProductsData() {
    return [
        {
            id: 1,
            name: "Vanilla Bliss",
            category: "Classic",
            price: 32.99,
            image: "images/pexels-alesia-talkachova-733353-20802369.jpg",
            description: "Our signature vanilla candle offers a warm, comforting scent that transforms any space into a cozy sanctuary.",
            burnTime: 50,
            fragrance: "Pure Vanilla, Warm Amber, Subtle Caramel",
            ingredients: "Premium Soy Wax, Cotton Wick, Pure Essential Oils"
        },
        {
            id: 2,
            name: "Midnight Lavender",
            category: "Classic",
            price: 34.99,
            image: "images/pexels-ioanamtc-13691977.jpg",
            description: "Unwind with the calming scent of lavender fields at dusk.",
            burnTime: 55,
            fragrance: "French Lavender, Bergamot, Cedarwood",
            ingredients: "Premium Soy Wax, Cotton Wick, Pure Essential Oils"
        },
        {
            id: 3,
            name: "Amber & Oud",
            category: "Modern",
            price: 42.99,
            image: "images/pexels-nati-87264186-10425309.jpg",
            description: "A sophisticated blend of rich amber and exotic oud wood creates a luxurious, warm atmosphere.",
            burnTime: 60,
            fragrance: "Amber, Oud Wood, Sandalwood, Musk",
            ingredients: "Premium Soy Wax, Cotton Wick, Pure Essential Oils"
        },
        {
            id: 4,
            name: "Artisan Cedarwood",
            category: "Artisanal",
            price: 48.99,
            image: "images/pexels-valeriia-harbuz-2161259-27969186.jpg",
            description: "Hand-poured in small batches, this artisanal candle features the rich, woody scent of aged cedarwood.",
            burnTime: 70,
            fragrance: "Aged Cedarwood, Pine Needle, Light Smoke",
            ingredients: "Premium Soy Wax, Cotton Wick, Pure Essential Oils"
        },
        {
            id: 5,
            name: "Smoky Ember",
            category: "Modern",
            price: 39.99,
            image: "images/candle-extinguished-with-smoke-trail.jpg",
            description: "A sophisticated blend with smoky notes that creates a mysterious and captivating atmosphere.",
            burnTime: 65,
            fragrance: "Smoked Wood, Amber, Vanilla",
            ingredients: "Premium Soy Wax, Cotton Wick, Pure Essential Oils"
        },
        {
            id: 6,
            name: "Golden Glow",
            category: "Artisanal",
            price: 45.99,
            image: "images/pexels-valeriia-harbuz-2161259-28820611.jpg",
            description: "A luxurious candle with warm golden tones that creates an elegant and inviting ambiance.",
            burnTime: 60,
            fragrance: "Warm Spices, Honey, Sandalwood",
            ingredients: "Premium Soy Wax, Cotton Wick, Pure Essential Oils"
        }
    ];
}

// Product modal functionality
function initProductModal() {
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const productModal = document.querySelector('.product-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModal = document.querySelector('.close-modal');
    const modalProduct = document.querySelector('.modal-product');
    
    // Open modal with product details
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const productCard = button.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            
            // Find product in our local data
            const products = getProductsData();
            const product = products.find(item => item.id === productId);
            
            if (product) {
                modalProduct.innerHTML = `
                    <div class="modal-product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="modal-product-details">
                        <p class="modal-product-category">${product.category}</p>
                        <h2 class="modal-product-title">${product.name}</h2>
                        <p class="modal-product-price">$${product.price.toFixed(2)}</p>
                        <div class="modal-product-description">
                            <p>${product.description}</p>
                        </div>
                        <div class="product-options">
                            <label class="option-label">Size</label>
                            <select class="option-select">
                                <option value="small">Small (4 oz)</option>
                                <option value="medium" selected>Medium (8 oz)</option>
                                <option value="large">Large (12 oz)</option>
                            </select>
                        </div>
                        <div class="add-to-cart-group">
                            <div class="modal-quantity">
                                <button class="modal-quantity-btn decrease">-</button>
                                <input type="number" class="modal-quantity-input" value="1" min="1" max="10">
                                <button class="modal-quantity-btn increase">+</button>
                            </div>
                            <button class="btn modal-add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                        <div class="product-meta">
                            <p><strong>Burn Time:</strong> ${product.burnTime} hours</p>
                            <p><strong>Fragrance:</strong> ${product.fragrance}</p>
                            <p><strong>Ingredients:</strong> ${product.ingredients}</p>
                        </div>
                    </div>
                `;
                
                // Initialize quantity buttons
                initQuantityButtons();
                
                // Add to cart functionality for modal
                const addToCartBtn = document.querySelector('.modal-add-to-cart');
                addToCartBtn.addEventListener('click', () => {
                    const quantity = parseInt(document.querySelector('.modal-quantity-input').value);
                    const size = document.querySelector('.option-select').value;
                    
                    // Add to cart using cart.js function
                    window.addToCart(product, quantity, size);
                    
                    // Close modal
                    closeProductModal();
                    
                    // Open cart sidebar
                    document.querySelector('.cart-sidebar').classList.add('open');
                    document.querySelector('.cart-overlay').classList.add('open');
                });
            }
            
            // Show modal
            productModal.classList.add('open');
            modalOverlay.classList.add('open');
            document.body.classList.add('no-scroll');
        });
    });
    
    // Close modal
    function closeProductModal() {
        productModal.classList.remove('open');
        modalOverlay.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }
    
    closeModal.addEventListener('click', closeProductModal);
    modalOverlay.addEventListener('click', closeProductModal);
    
    // Initialize quantity buttons in modal
    function initQuantityButtons() {
        const decreaseBtn = document.querySelector('.decrease');
        const increaseBtn = document.querySelector('.increase');
        const quantityInput = document.querySelector('.modal-quantity-input');
        
        decreaseBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            value = Math.max(1, value - 1);
            quantityInput.value = value;
        });
        
        increaseBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            value = Math.min(10, value + 1);
            quantityInput.value = value;
        });
    }
}

// Load products from data
function loadProducts() {
    const productsGrid = document.querySelector('.products-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Get products from our data function
    const products = getProductsData();
    
    // Display all products initially
    displayProducts(products);
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            if (filter === 'all') {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category.toLowerCase() === filter);
                displayProducts(filteredProducts);
            }
        });
    });
    
    // Initialize product modal after products are loaded
    initProductModal();
    
    // Function to display products
    function displayProducts(products) {
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.id = product.id;
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-overlay">
                        <div class="product-actions">
                            <button class="product-action-btn quick-view" title="Quick View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="product-action-btn add-to-cart" title="Add to Cart" data-id="${product.id}">
                                <i class="fas fa-shopping-bag"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners for add to cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const productId = button.dataset.id;
                const product = products.find(item => item.id === parseInt(productId));
                
                // Add to cart using cart.js function
                window.addToCart(product, 1, 'medium');
                
                // Show cart sidebar
                document.querySelector('.cart-sidebar').classList.add('open');
                document.querySelector('.cart-overlay').classList.add('open');
            });
        });
    }
}
