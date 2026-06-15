const watchlistGrid =
    document.querySelector("#watchlist-grid");

// Mobile Menu
const menuBtn =
    document.querySelector("#menu-btn");
const navigation =
    document.querySelector(".navigation");
menuBtn?.addEventListener("click", () => {
    navigation.classList.toggle("open");
});
// Footer
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

function displayWatchlist() {
    const watchlist =
        JSON.parse(localStorage.getItem("watchlist"))
        || [];

    if (watchlist.length === 0) {
        watchlistGrid.innerHTML = `
            <p class="loading">
                Your watchlist is empty.
            </p>
        `;

        return;
    }

    watchlistGrid.innerHTML = "";
    watchlist.forEach(movie => {
     const card = document.createElement("article");
        card.classList.add("movie-card");
        card.innerHTML = `
            <img src="${movie.image}"
                 alt="${movie.title}"
                 loading="lazy">

            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre}</p>
                <p>${movie.year}</p>
                <p>⭐ ${movie.rating}</p>
                <button class="details-btn remove-btn"
                        data-id="${movie.id}">
                    Remove
                </button>
            </div>
        `;

        watchlistGrid.appendChild(card);
    });

    addRemoveEvents();
}

function addRemoveEvents() {

    document.querySelectorAll(".remove-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id =
                    Number(button.dataset.id);

                let watchlist =
                    JSON.parse(
                        localStorage.getItem("watchlist")
                    ) || [];

                watchlist =
                    watchlist.filter(
                        movie => movie.id !== id
                    );

                localStorage.setItem(
                    "watchlist",
                    JSON.stringify(watchlist)
                );

                displayWatchlist();
            });

        });
}

displayWatchlist();