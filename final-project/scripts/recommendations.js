import { getMovies } from "./dataService.js";

const movieGrid = document.querySelector("#movie-grid") || document.querySelector("#recommendations-grid");
const genreFilter = document.querySelector("#genre-filter");
const categoryFilter = document.querySelector("#category-filter");

const modal = document.querySelector("#movie-modal");
const modalTitle = document.querySelector("#modal-title");
const modalMeta = document.querySelector("#modal-meta");
const modalDescription = document.querySelector("#modal-description");

const closeModalBtn = document.querySelector("#close-modal");
const addWatchlistBtn = document.querySelector("#add-watchlist");

let movies = [];
let selectedMovie = null;

// Mobile Menu
const menuBtn = document.querySelector("#menu-btn");
const navigation = document.querySelector(".navigation");

menuBtn?.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

// Footer
const currentYearEl = document.querySelector("#current-year");
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

async function initialize() {
    movies = await getMovies();

    populateGenres(movies);
    displayMovies(movies);
}

function populateGenres(data) {
    if (!genreFilter) return;
    const genres = [...new Set(data.map(movie => movie.genre))];

    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

function displayMovies(data) {
    if (!movieGrid) return;
    movieGrid.innerHTML = "";

    data.forEach(movie => {
        const card = document.createElement("article");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${movie.image}"
                 alt="${movie.title}"
                 loading="lazy">

            <div class="movie-info">
                <h3>${movie.title}</h3>

                <p>${movie.category}</p>

                <p>${movie.genre}</p>

                <p>${movie.year} | ⭐ ${movie.rating}</p>

                <button class="details-btn"
                        data-id="${movie.id}">
                    View Details
                </button>
            </div>
        `;

        movieGrid.appendChild(card);
    });

    addModalEvents();
}

function addModalEvents() {
    document.querySelectorAll(".details-btn")
        .forEach(button => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);

                selectedMovie = movies.find(movie => movie.id === id);
                if (!selectedMovie) return;

              
                const modalPoster = document.querySelector("#modal-poster");
                if (modalPoster) {
                    modalPoster.src = selectedMovie.image;
                    modalPoster.alt = `${selectedMovie.title} poster`;
                }

                modalTitle.textContent = selectedMovie.title;

                modalMeta.textContent =
                    `${selectedMovie.category} • ${selectedMovie.genre} • ${selectedMovie.year} • ⭐ ${selectedMovie.rating}`;

                modalDescription.textContent = selectedMovie.description;

                modal.showModal();
            });
        });
}

if (genreFilter) genreFilter.addEventListener("change", filterMovies);
if (categoryFilter) categoryFilter.addEventListener("change", filterMovies);

function filterMovies() {
    let filtered = [...movies];

    if (genreFilter && genreFilter.value !== "all") {
        filtered = filtered.filter(
            movie => movie.genre === genreFilter.value
        );
    }

    if (categoryFilter && categoryFilter.value !== "all") {
        filtered = filtered.filter(
            movie => movie.category === categoryFilter.value
        );
    }

    displayMovies(filtered);
}

if (addWatchlistBtn) {
    addWatchlistBtn.addEventListener("click", () => {
        if (!selectedMovie) return;

        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        const exists = watchlist.some(movie => movie.id === selectedMovie.id);

        if (!exists) {
            watchlist.push(selectedMovie);
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
            alert(`${selectedMovie.title} added to watchlist!`);
        } else {
            alert(`${selectedMovie.title} is already in your watchlist.`);
        }

        modal.close();
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        modal.close();
    });
}


document.addEventListener("DOMContentLoaded", () => {
    initialize();
});