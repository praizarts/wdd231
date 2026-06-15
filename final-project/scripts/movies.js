let movieData = [];

export async function loadMovies() {
    try {
        const response = await fetch("data/movies.json");
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        movieData = await response.json();
        const movieGrid = document.querySelector("#movie-grid");
        if (!movieGrid) return;
        const isHomePage =
            window.location.pathname.includes("index.html") ||
            window.location.pathname.endsWith("/");

        const moviesToDisplay = isHomePage
            ? movieData.filter(movie => movie.featured)
            : movieData;
        displayMovies(moviesToDisplay);

    } catch (error) {
        console.error(error);
        const movieGrid = document.querySelector("#movie-grid");
        if (movieGrid) {
            movieGrid.innerHTML = `
                <p class="loading">
                    Unable to load recommendations.
                </p>
            `;
        }
    }
}

function displayMovies(movies) {
    const movieGrid = document.querySelector("#movie-grid");

    movieGrid.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("article");
        card.classList.add("movie-card");
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title} poster" loading="lazy">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p><strong>Type:</strong> ${movie.category}</p>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Rating:</strong> ${movie.rating}</p>
                <button class="details-btn" data-id="${movie.id}">
                    View Details
                </button>
            </div>
        `;

        movieGrid.appendChild(card);
    });

    attachModalEvents();
}

function attachModalEvents() {
    const buttons = document.querySelectorAll(".details-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const movieId = Number(button.dataset.id);
            const movie = movieData.find(
                item => item.id === movieId
            );

            openModal(movie);
        });
    });
}

function openModal(movie) {
    const modal = document.querySelector("#movie-modal");
    if (!modal) return;
    document.querySelector("#modal-title").textContent =
        movie.title;
    document.querySelector("#modal-meta").textContent =
        `${movie.category} • ${movie.genre} • ${movie.year} • Rating ${movie.rating}`;
    document.querySelector("#modal-description").textContent =
        movie.description;
    modal.showModal();
}

export function initializeModal() {
    const modal = document.querySelector("#movie-modal");
    const closeBtn = document.querySelector("#close-modal");
    if (!modal || !closeBtn) return;
    closeBtn.addEventListener("click", () => {
        modal.close();
    });
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}

export function getMovies() {
    return movieData;
}