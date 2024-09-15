
//index.js
function goToHomePage() {
window.open('index.html', '_blank')
}

// Image slider logic
let currentSlide = 1; // Start at the first image
const slides = document.querySelectorAll('#image-slider img');
const totalSlides = slides.length;

function showSlide(index) {
    currentSlide = index;
    if (currentSlide < 1) {
        currentSlide = totalSlides;
    } else if (currentSlide > totalSlides) {
        currentSlide = 1;
    }

    slides.forEach((slide, i) => {
        slide.style.display = i + 1 === currentSlide ? 'block' : 'none';
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Preload all images to ensure they are immediately available
slides.forEach((slide, i) => {
    const img = new Image();
    img.src = slide.src;
});
// Set an interval to automatically advance the slides (adjust the duration as needed)
setInterval(nextSlide, 5000); // Change slide every 5 seconds
// Show/hide arrows on hover
function showArrows() {
    document.getElementById('prev').style.display = 'block';
    document.getElementById('next').style.display = 'block';
}

function hideArrows() {
    document.getElementById('prev').style.display = 'none';
    document.getElementById('next').style.display = 'none';
}







function clearCart() {
    cartItems = [];
    cartTotal = 0;
    // Update the cart UI after clearing
    updateCartUI();
}



document.addEventListener("DOMContentLoaded", () => {
    const cart = document.getElementById('proceed-to-buy-button');
    if (cart) {
        cart.style.display = 'none'; // Hide cart initially
    }
});

function getCartItems() {
    // Return a copy of the cart items
    return cartItems.map(item => ({ ...item }));
}



function openCart() {
    const cart = document.getElementById('cart');
    const menu = document.getElementById('menu');
    cart.style.display = 'block';
    
}

function closeCart() {
    const cart = document.getElementById('cart');
    cart.style.display = 'none';
}

function toggleCart() {
    const cart = document.getElementById('cart');
    const displayValue = window.getComputedStyle(cart).getPropertyValue('display');

    if (displayValue === 'none') {
        openCart();
    } else {
        closeCart();
    }
}
// Ensure the cart is hidden initially
toggleCart();
function buyNow(productId) {
    const product = {
        id: productId,
        name: `Product ${productId}`,
    };
    // Replace the URLs with the actual external websites for each product
    const externalWebsiteUrls = {
        1: "https://www.amazon.in/Apple-iPhone-13-128GB-Midnight/dp/B09G9HD6PD",
        2: "https://www.amazon.in/Redmi-Storage-Bezel-Less-Slimmest-Pro-Grade/dp/B0CQPGG8KG",
        3: "https://www.amazon.in/OnePlus-Iron-Gray-256GB-Storage/dp/B0CQYNM3ZF/ref=sr_1_3?crid=202HKFDN1GQRY&dib=eyJ2IjoiMSJ9.XFJCx0eZwevDKRA7YwRrFhljjeGzjcVCR8DAQELF90uvfKXU44Rd2yGPQSKooxNkv1MU-6BBcbYd6aRQiLIVMAD8bMLUNGb9ngJJ5u1oRbqdm9ETzeILTKPa8Tm2Lz8X3TCnUW7oNGESEFKBdIrd6nM3By55dZSwaNSNVJ1kgJhyZ19unLyjNMVM_3IxUmp8_za22ozgIqPBuSwdjzL4BxIyYvIc2TQUVP7UZzlCURU.jrIeiKCw7LenLbxhKTXCVHUFRxZd3gDcTR_r5epg_gw&dib_tag=se&keywords=mobile%2Bphone&qid=1709904976&sprefix=mobile%2Bp%2Caps%2C449&sr=8-3&th=1",
        4: "https://www.amazon.in/Apple-2024-MacBook-Laptop-chip/dp/B0CX2532GD",
        5: "https://www.amazon.in/HP-i5-1235U-15-6-inch-graphics-speakers/dp/B0CTKHTNWL/ref=sr_1_4?crid=24MF5FY27KX3U&dib=eyJ2IjoiMSJ9.9zhNTtyM6wB18-nU56oobkN01tiS8xNw8BZwVe-RejUpaFc5jVxdNuJTP_2u3f7noU4ce_kInf32JGiqB0xsO9voyEwecl1xk66o0ARexuP2MT3tUctZJew4RJDoRcAEJ_sp70XSozzRzv3gmyiCg_RhrEeH4UAN4RYHTrWVuEr-mAzgv8QicaNXNsv84YQzMap0PLSDkLG9pi4v6vYl0zhla0PPhAt8wXnZPFmINYI.RmP_Xmr6T2R-XnmhovOoWYo9ccRN41ClHt-qDD1ELc0&dib_tag=se&keywords=laptop&qid=1720974222&sprefix=laptop%2Caps%2C258&sr=8-4",
        6: "https://www.amazon.in/Whirlpool-Refrigerator-205-WDE-CLS/dp/B0BSRVL2VV/ref=sr_1_5?crid=2FNGVFWE3L8Q2&dib=eyJ2IjoiMSJ9.r93Z6B2UzHdrixVdAGuidHNnwZvZ5Ad6ntKoA5GVDxSTzuHI3aR10f77fHM7CpfY_Cfy6ZN-xcZ0EWBr7pavMmvnJkKlC3b8T-g4l13TnUr7Ph6ENaj1JexxUWv-xn10XLS57P9RaaVaRy0o2qVVEEyXH3BMQ6DLEOQgIIUbd-GVeBAboPDEPGfOx23sbd-9ntXZNepEJ19wKzhNao8TibPy-WpmNOwqoFRg22YEBIQ.5HBY1NOr1NPicg27cvlYaB5ZlqAeD8wRIjFYAN1QjL8&dib_tag=se&keywords=fridge&qid=1720975223&sprefix=fri%2Caps%2C326&sr=8-5&th=1"
        // Add more URLs as needed
    };

    const checkoutUrl = externalWebsiteUrls[productId];
    // Redirect the user to the external website for the specific product
    if (checkoutUrl) {
        window.open(checkoutUrl, "_blank");
    } else {
        console.error(`No checkout URL found for Product ${productId}`);
    }
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    // Loop through each product and hide/show based on search input
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(searchInput)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function redirectToAuthPage() {
    window.open('auth2.html', '_blank');
}

function openProductDetails(productId) {
    const productDiv = document.querySelector(`.product${productId}`);
    const productName = productDiv.querySelector('h2').textContent;
    const productImageSrc = productDiv.querySelector('img').src;
    const productPrice = productDiv.querySelector('.price' + productId).textContent.replace('₹', '').replace(',', '');

    // Construct the URL with the product details as query parameters
    const productDetailsUrl = `product-details.html?productName=${encodeURIComponent(productName)}&productImageSrc=${encodeURIComponent(productImageSrc)}&productPrice=${encodeURIComponent(productPrice)}`;

    // Open the product details page in a new tab
    window.open(productDetailsUrl, '_blank');
}



    document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("cart").style.display = "none";
      });