import { movieDetails, searchMovies } from "../services/api.js"
import * as favService from "../services/favService.js"
import { createCard } from "./components/movieCard.js";
import { createFavItem } from "./components/favorites.js";
import { openModal } from "./components/modal.js";

const elements = {
    searchForm: document.getElementById("search-form"),
    movieGrid: document.querySelector(".movie-grid"),
    favoritesList: document.querySelector(".fav-list"),
    errorBox: document.getElementById("error-box"),
    errorMsg: document.querySelector(".msg"),
    modal: document.getElementById("movie-modal"),
}

let currentSearchMovies = [];

// Render all favorites from localStorage
function renderFavorites() {
    elements.favoritesList.innerHTML = '';
    const favorites = favService.getAllFavorites();
    if (favorites.length === 0) {
        elements.favoritesList.innerHTML = '<li>No favorites yet!';
    } else {
        favorites.forEach(fav => {
            const favElement = createFavItem(fav, () => {
                favService.removeFavorites(fav.imdbID);
                renderFavorites();
                const cardInGrid = elements.movieGrid.querySelector(`[data-imdb-id="${fav.imdbID}"]`);
                if (cardInGrid) {
                    cardInGrid.querySelector('.fa-heart').classList.remove('favorited');
                }
            });
            elements.favoritesList.appendChild(favElement);
        });
    }
}

// Searching for movie title
async function renderMovies(event) {
    // TODO add spinner when loading
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchInput = formData.get('search').trim();
    if (!searchInput) return;

    try {
        currentSearchMovies = await searchMovies(searchInput);
        elements.movieGrid.replaceChildren('');
        currentSearchMovies.forEach(movie => {
            const isFav = favService.isFavorite(movie.imdbID);
            elements.movieGrid.appendChild(createCard(movie, onCardClick, isFav));
        });
    } catch (error) {
        showError(error.message);
    }
}

async function onCardClick(event) {
    const card = event.target.closest('.movie-card');
    if (!card) return;

    const imdbID = card.dataset.imdbId;

    const movie = currentSearchMovies.find(m => m.imdbID === imdbID);

    try {
        if (event.target.classList.contains('btn-details')) {
            const movieInfo = await movieDetails(imdbID);

            const onModalFavClick = () => {
                favService.addFavorites(movieInfo);
                renderFavorites();
                card.querySelector('.fa-heart').classList.add('favorited');
                alert(`${movieInfo.Title} added to favorites!`);
            };
            openModal(movieInfo, onModalFavClick);
            elements.modal.classList.remove("hidden");
        }

        if (event.target.classList.contains('btn-add') || event.target.classList.contains('fa-heart')) {
            favService.addFavorites(movie);
            event.target.closest('.btn-add').querySelector('.fa-heart').classList.add('favorited');
            renderFavorites();
        }
    } catch (error) {
        showError(error.message);
    }
};

// Error notification
function showError(msg) {
    elements.errorMsg.textContent = msg;
    elements.errorBox.style.display = "inline-block";
    setTimeout(hide, 2000);
}

function hide() {
    elements.errorBox.style.display = "none";
}

export function onLoad() {
    elements.searchForm.addEventListener('submit', renderMovies);
    renderFavorites();
    displayFavoritesOnLoad();
}

function displayFavoritesOnLoad() {
    const favorites = favService.getAllFavorites();

    if (favorites.length === 0) {
        elements.movieGrid.innerHTML = '<p class="placeholder-text">Your favorite movies will appear here. <br>Start by searching for a movie!</p>';
        return;
    }
    currentSearchMovies = favorites;

    elements.movieGrid.innerHTML = '';
    favorites.forEach(movie => {
        const cardElement = createCard(movie, onCardClick, true);
        elements.movieGrid.appendChild(cardElement);
    });
}

