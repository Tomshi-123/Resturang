// Hämta HTML-element som vi kommer att manipulera med JavaScript
const openShopping = document.getElementById('openShopping'); // Knapp för att öppna kundvagnen
const closeShopping = document.getElementById('closeShopping'); // Knapp för att stänga kundvagnen
const cart = document.getElementById('cart'); // Kundvagnen (div som ska flyttas på)
const cartItems = document.getElementById('cartItems'); // Elementet som håller listan med produkter i kundvagnen
const cartTotal = document.getElementById('cartTotal'); // Elementet där totalbeloppet för kundvagnen visas
const quantity = document.querySelector('.quantity'); // Elementet där antalet varor i kundvagnen visas
const productList = document.getElementById('productList'); // Elementet där alla produkter ska visas på sidan

// En array för att hålla alla produkter som läggs till i kundvagnen
let cartData = [];

// Funktion för att hämta data från JSON-filen
async function fetchMenuItems() {
    try {
        const response = await fetch('menu.json');  // Hämta JSON-filen
        const menuItems = await response.json();  // Omvandla JSON-responsen till JavaScript-objekt
        return menuItems;
    } catch (error) {
        console.error('Fel vid hämtning av meny:', error);
        return [];  // Returnera en tom array vid fel
    }
}

// Funktion för att visa rätter baserat på kategori
async function displayMenu(filter = "all") {
    const menuItems = await fetchMenuItems();  // Hämta maträtterna från JSON-filen
    const filteredItems = filter === "all" ? menuItems : menuItems.filter(item => item.category === filter);

    productList.innerHTML = "";  // Töm tidigare produkter i listan

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
        button.addEventListener('click', () => addToCart(item));  // Lägg till produkt i kundvagn

        productList.appendChild(productDiv);
    });
}

// Funktion för att filtrera menyn baserat på kategori
function filterMenu(category) {
    displayMenu(category);  // Anropa displayMenu med vald kategori
}

// Funktion som uppdaterar kundvagnen
const updateCart = () => {
    cartItems.innerHTML = ""; // Rensa den gamla listan med varor i kundvagnen
    let total = 0; // Totalbeloppet för alla produkter i kundvagnen
    let itemCount = 0; // Totalt antal produkter i kundvagnen

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

    cartTotal.textContent = total; // Uppdatera totalbeloppet
    quantity.textContent = itemCount; // Uppdatera antalet varor i kundvagnen
};

// Funktion som lägger till en produkt i kundvagnen
const addToCart = (product) => {
    const existingProduct = cartData.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartData.push({ ...product, quantity: 1 });
    }
    updateCart();
};

// Funktion som växlar mellan att visa eller dölja kundvagnen
const toggleCart = () => {
    cart.style.right = cart.style.right === '0px' ? '-340px' : '0px';
};

// Lägg till event listeners på öppna och stänga-knappar
openShopping.addEventListener('click', toggleCart);
closeShopping.addEventListener('click', toggleCart);

// Funktion för att ta bort en produkt från kundvagnen
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

// Ladda in standardmenyn när sidan laddas
document.addEventListener("DOMContentLoaded", () => displayMenu());  // Visa alla produkter när sidan laddas

// Lägg till event listeners för filtrering av produkter
document.querySelector('.filter-buttons').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const category = e.target.textContent.toLowerCase();
        filterMenu(category);  // Filtrera produkter baserat på val
    }
});
