// Funktion för att hämta data från JSON-filen
async function fetchMenuItems() {
    try {
        // Hämtar JSON-filen med hjälp av fetch()
        const response = await fetch('menu.json');  // Hämta JSON-filen
        
        // Omvandlar JSON-responsen till ett JavaScript-objekt
        const menuItems = await response.json();  // Omvandla JSON-responsen till JavaScript-objekt
        
        // Returnera de hämtade maträtterna
        return menuItems;

    } catch (error) {
        // Om ett fel uppstår (t.ex. filen går inte att hämta) loggas det i konsolen
        console.error('Fel vid hämtning av meny:', error);
        
        // Returnera en tom array om något gick fel
        return [];  // Retur en tom array vid fel
    }
}

// Funktion för att visa rätter
async function displayMenu(filter = "all") {
    // Hämtar referensen till elementet som ska innehålla menyn
    const menuContainer = document.getElementById("menu-container");
    
    // Tömmer menyn på innehåll (så att den inte dupliceras varje gång)
    menuContainer.innerHTML = ""; // Rensa menyn innan vi lägger till nya rätter

    // Hämtar maträtterna från JSON-filen genom att anropa fetchMenuItems()
    const menuItems = await fetchMenuItems();  // Hämta maträtterna från JSON-filen

    let filteredItems;  // Skapa en variabel för de filtrerade maträtterna

    // Om filtreringen är "all", visa de första 9 maträtterna (3 per kategori)
    if (filter === "all") {
        filteredItems = [
            // Filtrera de 3 första maträtterna i kategorin "fish"
            ...menuItems.filter(item => item.category === "fish"),
            
            // Filtrera de 3 första maträtterna i kategorin "vegetarian"
            ...menuItems.filter(item => item.category === "vegetarian"),
            
            // Filtrera de 3 första maträtterna i kategorin "meat"
            ...menuItems.filter(item => item.category === "meat")
        ];
    } else {
        // Annars, filtrera maträtterna baserat på den valda kategorin
        filteredItems = menuItems.filter(item => item.category === filter);
    }

    // Loopa igenom de filtrerade maträtterna och lägg till dem i menyn
    filteredItems.forEach(item => {
        // Skapar en ny div för varje maträtt
        const menuItem = document.createElement("div");
        
        // Lägger till en CSS-klass för att kunna styla maträtten
        menuItem.classList.add("menu-item");

        // Fyller div:en med HTML-innehåll: en bild och maträttens namn
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">  <!-- Visar bilden av maträtten -->
            <p>${item.price} SEK</p><button class="select-btn">Välj</button> <!-- Visar maträttens namn -->
        `;

        // Lägger till maträtten i menuContainer (HTML-elementet som innehåller menyn)
        menuContainer.appendChild(menuItem);
    });
}

// Funktion för att filtrera menyn vid knapptryck
function filterMenu(category) {
    // Anropar displayMenu-funktionen med den valda kategorin som filter
    displayMenu(category);
}

// Ladda in standardmenyn när sidan laddas
document.addEventListener("DOMContentLoaded", () => displayMenu());  // När sidan har laddats, visa menyn



//Räkna ut kostnad för valda rätter


function calculateCost() {

    const menuItems = document.getElementsByClassName("menu-Item");
    for (let i = 0; i < menuItems.length; i++) {
        if (menuItems[i].classList.contains("selected")) {
            totalCost += 10;
        

        
        }
    }
}

// Funktion för att uppdatera kostnaden
let totalCost = 0;  // Variabel för den totala kostnaden som börjar på 0

// Funktion som uppdaterar total kostnad
function updateCost(price) {
    totalCost += price;  // Lägg till eller ta bort det angivna priset från totalCost
    document.getElementById("cost-value").textContent = totalCost;  // Uppdatera visad kostnad i elementet med id 'cost-value'
}

// Funktion för att nollställa kostnaden
function resetCost() {
    totalCost = 0;  // Sätt totalCost till 0
    document.getElementById("cost-value").textContent = totalCost;  // Uppdatera visad kostnad till 0
}

// Lägg till eventlyssnare för varje maträtts knapp när DOM är helt laddad
document.addEventListener('DOMContentLoaded', () => {
    displayMenu();  // Ladda in och visa menyn när sidan är klar

    // Lägg till eventlyssnare på "Välj"-knapparna (där användaren klickar för att välja maträtter)
    document.getElementById("menu-container").addEventListener("click", (event) => {
        // Kontrollera om det var en knapp med klassen "select-btn" som blev klickad
        if (event.target && event.target.classList.contains("select-btn")) {
            const menuItem = event.target.closest(".menu-item");  // Hitta den närmaste föräldern som är en "menu-item"
            
            // Extrahera priset för den valda maträtten genom att hämta texten från <p> och ta bort ' SEK'
            const price = parseFloat(menuItem.querySelector("p").textContent.replace(' SEK', ''));

            // Om maträtten markeras (om den inte är markerad, markera den)
            if (menuItem.classList.toggle("selected")) {
                updateCost(price);  // Lägg till priset till totalCost om maträtten blev vald
            } else {
                updateCost(-price);  // Ta bort priset från totalCost om maträtten avmarkerades
            }
        }
    });
});


//Modal

let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("buffeBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}