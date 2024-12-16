var menu = document.querySelector(".header-navbar");
var openMenuButton = document.querySelector(".open-menu");
var closeMenuButton = document.querySelector(".close-menu");

function openMenu() {
  menu.classList.add("open");
}

function closeMenu() {
  menu.classList.remove("open");
}