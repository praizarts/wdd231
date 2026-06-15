import { getMovies } from "./dataService.js";

const movieGrid = document.querySelector("#movie-grid");
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
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

async function initialize() {
    movies = await getMovies();

    populateGenres(movies);
    displayMovies(movies);
}

function populateGenres(data) {
    const genres = [...new Set(data.map(movie => movie.genre))];

    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

function displayMovies(data) {

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

                selectedMovie =
                    movies.find(movie => movie.id === id);

                modalTitle.textContent =
                    selectedMovie.title;

                modalMeta.textContent =
                    `${selectedMovie.category} • ${selectedMovie.genre} • ${selectedMovie.year} • ⭐ ${selectedMovie.rating}`;

                modalDescription.textContent =
                    selectedMovie.description;

                modal.showModal();
            });

        });
}

genreFilter.addEventListener("change", filterMovies);
categoryFilter.addEventListener("change", filterMovies);

function filterMovies() {

    let filtered = [...movies];

    if (genreFilter.value !== "all") {
        filtered = filtered.filter(
            movie => movie.genre === genreFilter.value
        );
    }

    if (categoryFilter.value !== "all") {
        filtered = filtered.filter(
            movie => movie.category === categoryFilter.value
        );
    }

    displayMovies(filtered);
}

addWatchlistBtn.addEventListener("click", () => {

    if (!selectedMovie) return;

    const watchlist =
        JSON.parse(localStorage.getItem("watchlist"))
        || [];

    const exists = watchlist.some(
        movie => movie.id === selectedMovie.id
    );

    if (!exists) {

        watchlist.push(selectedMovie);

        localStorage.setItem(
            "watchlist",
            JSON.stringify(watchlist)
        );
    }

    modal.close();
});

closeModalBtn.addEventListener("click", () => {
    modal.close();
});

initialize();