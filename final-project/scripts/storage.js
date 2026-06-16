const watchlistGrid = document.querySelector("#watchlist-grid");
const emptyMessage = document.querySelector("#empty-watchlist");

let watchlist = [];
let selectedMovie = null;

document.addEventListener("DOMContentLoaded", () => {
    loadWatchlist();
    initializeModal();
});

function loadWatchlist() {
    watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];

    displayWatchlist();
}

function displayWatchlist() {
    if (!watchlistGrid) return;

    watchlistGrid.innerHTML = "";

    if (watchlist.length === 0) {
        watchlistGrid.innerHTML = `
            <p class="loading">
                Your watchlist is currently empty.
            </p>
        `;
        return;
    }

    watchlist.forEach(movie => {
        const card = document.createElement("article");

        card.classList.add("movie-card");

        card.innerHTML = `
            <img
                src="${movie.image}"
                alt="${movie.title} poster"
                loading="lazy"
            >

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p><strong>Type:</strong> ${movie.category}</p>

                <p><strong>Genre:</strong> ${movie.genre}</p>

                <p><strong>Rating:</strong> ${movie.rating}</p>

                <button
                    class="details-btn"
                    data-id="${movie.id}">
                    View Details
                </button>

            </div>
        `;

        watchlistGrid.appendChild(card);
    });

    attachDetailButtons();
}

function attachDetailButtons() {
    const buttons =
        document.querySelectorAll(".details-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {

            const movieId =
                Number(button.dataset.id);

            const movie =
                watchlist.find(
                    item => item.id === movieId
                );

            if (movie) {
                openModal(movie);
            }
        });
    });
}

function openModal(movie) {
    selectedMovie = movie;

    const modal =
        document.querySelector("#movie-modal");

    // DYNAMICALLY INJECT THE POSTER IMAGE TO THE LEFT
    const modalPoster = document.querySelector("#modal-poster");
    if (modalPoster) {
        modalPoster.src = movie.image;
        modalPoster.alt = `${movie.title} poster`;
    }

    document.querySelector("#modal-title").textContent =
        movie.title;

    document.querySelector("#modal-meta").textContent =
        `${movie.category} • ${movie.genre} • ${movie.year} • Rating ${movie.rating}`;

    document.querySelector("#modal-description").textContent =
        movie.description;

    modal.showModal();
}

function initializeModal() {
    const modal =
        document.querySelector("#movie-modal");

    const closeBtn =
        document.querySelector("#close-modal");

    const removeBtn =
        document.querySelector("#remove-watchlist");

    if (!modal) return;

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.close();
        });
    }

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.close();
        }
    });

    if (removeBtn) {
        removeBtn.addEventListener("click", () => {

            if (!selectedMovie) return;

            watchlist = watchlist.filter(
                movie => movie.id !== selectedMovie.id
            );

            localStorage.setItem(
                "watchlist",
                JSON.stringify(watchlist)
            );

            modal.close();

            displayWatchlist();
        });
    }
}