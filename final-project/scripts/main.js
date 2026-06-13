import { loadMovies, initializeModal } from "./movies.js";

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupFooter();
    initializeModal();
    loadMovies();
});

function setupNavigation() {
    const menuBtn = document.querySelector("#menu-btn");
    const navigation = document.querySelector(".navigation");

    if (!menuBtn || !navigation) return;

    menuBtn.addEventListener("click", () => {
        navigation.classList.toggle("open");

        menuBtn.textContent =
            navigation.classList.contains("open")
                ? "✕"
                : "☰";
    });
}

function setupFooter() {
    const yearElement = document.querySelector("#current-year");
    const modifiedElement = document.querySelector("#last-modified");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (modifiedElement) {
        modifiedElement.textContent = document.lastModified;
    }
}