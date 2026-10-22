
/* Sample Handmade Products */

const products = [
    {
        id: 1,
        name: "Handmade Clay Pot",
        category: "Pottery",
        price: 350,
        artisan: "Ravi Kumar",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Traditional Jewellery",
        category: "Jewellery",
        price: 450,
        artisan: "Anjali Raj",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Decorative Handmade Vase",
        category: "Home Decor",
        price: 550,
        artisan: "Lakshmi Nair",
        image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Handwoven Textile",
        category: "Textiles",
        price: 700,
        artisan: "Meera Thomas",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Handcrafted Wall Art",
        category: "Handicrafts",
        price: 600,
        artisan: "Lakshmi Nair",
        image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Clay Tea Cup Set",
        category: "Pottery",
        price: 400,
        artisan: "Ravi Kumar",
        image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=800&q=80"
    }
];


/* Get HTML Elements */

const productContainer = document.getElementById("productContainer");
const productSearch = document.getElementById("productSearch");
const productSearchButton = document.getElementById("productSearchButton");
const productFilters = document.querySelectorAll(".product-filter");
const productNoResults = document.getElementById("productNoResults");

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const cartButton = document.getElementById("cartButton");
const checkoutButton = document.getElementById("checkoutButton");
const checkoutMessage = document.getElementById("checkoutMessage");


/* Shopping Cart Data */

let cart = [];


/* Display Products */

function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {
        productNoResults.hidden = false;
        return;
    }

    productNoResults.hidden = true;

    productList.forEach(function(product) {

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
                loading="lazy"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p class="product-artisan">
                    Made by ${product.artisan}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${product.price}
                    </span>

                    <button class="add-cart-button">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        const addButton = card.querySelector(".add-cart-button");

        addButton.addEventListener("click", function() {
            addToCart(product.id);
        });

        productContainer.appendChild(card);

    });
}


/* Search Products */

function searchProducts() {

    const searchText = productSearch.value.toLowerCase().trim();

    const filteredProducts = products.filter(function(product) {

        return (
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.artisan.toLowerCase().includes(searchText)
        );

    });

    displayProducts(filteredProducts);

}


/* Search Button */

productSearchButton.addEventListener("click", function() {
    searchProducts();
});


productSearch.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchProducts();
    }

});


/* Filter Products */

productFilters.forEach(function(filterButton) {

    filterButton.addEventListener("click", function() {

        const selectedCategory = filterButton.dataset.category;

        productFilters.forEach(function(button) {
            button.classList.remove("active");
        });

        filterButton.classList.add("active");

        if (selectedCategory === "All") {
            displayProducts(products);
        } else {

            const filteredProducts = products.filter(function(product) {
                return product.category === selectedCategory;
            });

            displayProducts(filteredProducts);
        }

    });

});


/* Add Products to Cart */

function addToCart(productId) {

    const existingItem = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {

        const product = products.find(function(item) {
            return item.id === productId;
        });

        cart.push({
            ...product,
            quantity: 1
        });

    }

    checkoutMessage.textContent = "";
    displayCart();

}


/* Display Shopping Cart */

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    }

    cart.forEach(function(item) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        itemCount += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <div class="cart-item-actions">
                <strong>₹${itemTotal}</strong>

                <button class="remove-cart-button">
                    Remove
                </button>
            </div>
        `;

        cartItem.querySelector(".remove-cart-button")
            .addEventListener("click", function() {
                removeFromCart(item.id);
            });

        cartItems.appendChild(cartItem);

    });

    cartCount.textContent = itemCount;
    cartTotal.textContent = total;

}


/* Remove Products from Cart */

function removeFromCart(productId) {

    cart = cart.filter(function(item) {
        return item.id !== productId;
    });

    displayCart();

}


/* Scroll to Shopping Cart */

cartButton.addEventListener("click", function() {

    document.getElementById("shoppingCart").scrollIntoView({
        behavior: "smooth"
    });

});


/* Checkout Button */

checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {
        checkoutMessage.textContent = "Please add products to your cart first.";
        checkoutMessage.style.color = "red";
        return;
    }


});


/* Load Products and Empty Cart */

displayProducts(products);
displayCart();
