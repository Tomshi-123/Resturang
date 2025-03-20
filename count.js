


//Räkna ut kostnad för valda rätter

// function calculateCost() {

    const menuItems = document.getElementsByClassName("menu-Item");
    for (let i = 0; i < menuItems.length; i++) {
        if (menuItems[i].classList.contains("selected")) {
            totalCost += 10;
        

        
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


