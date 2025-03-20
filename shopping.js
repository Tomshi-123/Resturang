// ============================
// Hämta HTML-element
// ============================
const openShopping = document.getElementById('openShopping');
const closeShopping = document.getElementById('closeShopping');
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const quantity = document.querySelector('.quantity');
const productList = document.getElementById('productList');

// ============================
// Globala variabler
// ============================
let cartData = [];
let totalCost = 0;

// ============================
// Funktion: Hämta data från JSON-filen
// ============================
async function fetchMenuItems() {
    try {
        const response = await fetch('menu.json');
        const menuItems = await response.json();
        return menuItems;
    } catch (error) {
        console.error('Fel vid hämtning av meny:', error);
        return [];
    }
}

// ============================
// Funktion: Visa produkter på sidan (med filtrering)
// ============================
async function displayMenu(filter = "all") {
    const menuItems = await fetchMenuItems();
    console.log(menuItems);

    const filteredItems = filter === "all" ? menuItems : menuItems.filter(item => item.category === filter);
    console.log(filteredItems);

    productList.innerHTML = ""; 

    filteredItems.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p class="price">${item.price} SEK</p>
            <button>Add to Cart</button>
        `;

        const button = productDiv.querySelector('button');
        button.addEventListener('click', () => addToCart(item));

        productList.appendChild(productDiv);
    });
}

// ============================
// Funktion: Filtrera produkter baserat på kategori
// ============================
function filterMenu(category) {
    console.log(`Filtering by category: ${category}`);
    displayMenu(category);
}

// ============================
// Funktion: Uppdatera kundvagn
// ============================
const updateCart = () => {
    cartItems.innerHTML = "";
    let total = 0;
    let itemCount = 0;

    cartData.forEach(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        let listItem = document.createElement("li");
        listItem.innerHTML = `<span>${item.name}</span> <span>${item.quantity} x ${item.price} SEK</span>`;

        let removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.addEventListener('click', () => removeFromCart(item.id));

        listItem.appendChild(removeButton);
        cartItems.appendChild(listItem);
    });

    cartTotal.textContent = total;
    quantity.textContent = itemCount;
    updateCost(total);
};

// ============================
// Funktion: Lägg till produkt i kundvagnen
// ============================
const addToCart = (product) => {
    const existingProduct = cartData.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartData.push({ ...product, quantity: 1 });
    }

    updateCart();
};

// ============================
// Funktion: Ta bort produkt från kundvagnen
// ============================
const removeFromCart = (productId) => {
    const index = cartData.findIndex(item => item.id === productId);

    if (index !== -1) {
        if (cartData[index].quantity > 1) {
            cartData[index].quantity--;
        } else {
            cartData.splice(index, 1);
        }
    }

    updateCart();
};

// ============================
// Funktion: Växla visning av kundvagn
// ============================
const toggleCart = () => {
    cart.style.right = cart.style.right === '0px' ? '-340px' : '0px';
};

// ============================
// Funktion: Uppdatera total kostnad
// ============================
function updateCost(price) {
    totalCost = price;
    document.getElementById("cost-value").textContent = totalCost;
}

// ============================
// Funktion: Återställ kostnad
// ============================
function resetCost() {
    totalCost = 0;
    document.getElementById("cost-value").textContent = totalCost;
}

// ============================
// Event Listeners
// ============================
openShopping.addEventListener('click', toggleCart);
closeShopping.addEventListener('click', toggleCart);

// ============================
// Initialisering vid sidladdning
// ============================
document.addEventListener("DOMContentLoaded", () => {
    displayMenu();

    document.querySelector('.filter-buttons').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const category = e.target.id;
            console.log("Filter button clicked! Category:", category);
            filterMenu(category);
        }
    });
});
