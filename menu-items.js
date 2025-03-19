document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle-btn");
    const navMenu = document.querySelector(".navigation-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show");
        console.log(navMenu.classList);  // För att se om klassen 'show' läggs till eller tas bort
    });
});
