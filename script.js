const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");

menuIcon.addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuIcon.classList.toggle("open");
});

navbar.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("active");
        menuIcon.classList.remove("open");
    });
});
