// Set timestamp
document.getElementById('timestamp').value = new Date().getTime();

// Modal Logic
const openButtons = document.querySelectorAll('.open-modal');
const closeButtons = document.querySelectorAll('.close-modal');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        document.getElementById(modalId).showModal();
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});


// JavaScript for Hamburger
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#navigation"); 
hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
    hamburger.textContent = nav.classList.contains("open") ? "✖" : "☰";
});

// Footer Get Current Year and Last Modified Date
document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;