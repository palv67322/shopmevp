//userdata.js
let cartItems = [];
let cartTotal = 0;
let isAuthenticated = false; // Track authentication state
let userId = null; // Track user ID



function addToCart(productId) {
    const productDiv = document.querySelector(`.product${productId}`);
    const productImage = productDiv.querySelector('img');

    const product = {
        id: productId,
        name: productDiv.querySelector('h2').textContent,
        price: parseFloat(productDiv.querySelector('.price' + productId).textContent.replace('₹', '').replace(',', '')),
        imageSrc: productImage ? productImage.src : ''
    };

    // Check if the product is already in the cart
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
        alert('This product is already in your cart.');
        return;
    }

    cartItems.push(product);
    cartTotal += product.price;

    updateCartUI();

    if (isAuthenticated && userId) {
        saveCartToFirestore();
    } else {
        saveCartToLocalStorage();
    }
}

function removeFromCart(productId) {
    const index = cartItems.findIndex(item => item.id === productId);

    if (index !== -1) {
        cartTotal -= cartItems[index].price;
        cartItems.splice(index, 1);
        if (cartItems.length === 0) {
            cartTotal = 0;
        }
        updateCartUI();

        if (isAuthenticated && userId) {
            saveCartToFirestore();
        } else {
            saveCartToLocalStorage();
        }
    }
}

function updateCartUI() {
    const cartList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const proceedToBuyButton = document.getElementById('proceed-to-buy-button');

    cartList.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.imageSrc}" alt="${item.name}">
            <div class="cart-item-details">
                <h2>${item.name}</h2>
                <span>₹${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})">Remove from Cart</button>
            </div>
        `;
        cartList.appendChild(li);
    });

    cartTotalElement.textContent = `₹${cartTotal.toFixed(2)}`;
    proceedToBuyButton.style.display = cartItems.length > 0 ? 'block' : 'none';
}

function proceedToBuy() {
    if (!isAuthenticated) {
        alert("You need to sign in to proceed to buy.");
        window.open("auth2.html")
    }

    const cartParams = encodeURIComponent(JSON.stringify(cartItems));
    window.open(`cart.html?cartItems=${cartParams}`, '_blank');
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', cartTotal.toFixed(2));
}

function loadCartFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedCartTotal = localStorage.getItem('cartTotal');

    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
        cartTotal = parseFloat(storedCartTotal);
        updateCartUI();
    }
}

function saveCartToFirestore() {
    if (userId) {
        db.collection('carts').doc(userId).set({
            cartItems: cartItems,
            cartTotal: cartTotal
        })
        .then(() => {
            console.log("Cart saved to Firestore successfully!");
        })
        .catch((error) => {
            console.error("Error saving cart to Firestore: ", error);
        });
    }
}

function loadCartFromFirestore() {
    if (userId) {
        db.collection('carts').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                cartItems = data.cartItems;
                cartTotal = data.cartTotal;
                updateCartUI();
            } else {
                console.log("No cart found in Firestore, loading from local storage.");
                loadCartFromLocalStorage();
            }
        })
        .catch((error) => {
            console.error("Error loading cart from Firestore: ", error);
            loadCartFromLocalStorage();
        });
    } else {
        loadCartFromLocalStorage();
    }
}



document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();

    const cart = document.getElementById('proceed-to-buy-button');
    if (cart) {
        cart.style.display = 'none';
    }
});


