import { movieDetails, searchMovies, getTrailerData } from "../services/api.js"
import { createCard } from "./components/movieCard.js";
import { createFav } from "./components/favorites.js";
import { openModal } from "./components/modal.js";

const elements = {
    searchForm: document.getElementById("search-form"),
    movieGrid: document.querySelector(".movie-grid"),
    errorBox: document.getElementById("error-box"),
    errorMsg: document.querySelector(".msg"),
    modal: document.getElementById("movie-modal"),
}

let movies = [];

// Searching for movie title
async function renderMovies(event) {
    // TODO add spinner when loading
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchInput = formData.get('search');
    if (!searchInput) return;

    try {
        movies = await searchMovies(searchInput);

        elements.movieGrid.replaceChildren('');
        movies.forEach(movie => document.querySelector(".movie-grid").appendChild(createCard(movie, onCardClick)));
    } catch (error) {
        showError(error);
    }
}
// TODO: link the buttons to Favorites
// Handling card click
async function onCardClick(event) {
    let ytID = null;
    if (event.target.tagName === 'BUTTON' || event.target.tagName === 'I') {
        const imdb = event.currentTarget.parentNode.dataset.imdb;
        const trailersData = await getTrailerData(imdb);
        if (trailersData.message !== "No trailers found") {
            ytID = trailersData[0].youtube_video_id;
        };
        try {
            if (event.target.classList.contains('btn-details')) {
                const movieInfo = await movieDetails(imdb);
                openModal(movieInfo, ytID);
                elements.modal.classList.remove("hidden");
            }
            if (event.target.classList.contains('btn-add') || event.target.classList.contains('fa-heart')) {
                await addFavorite(imdb);
            }
        } catch (error) {
            // TODO handle error display
            showError(error);
        }
    };
}

async function addFavorite(imdb) {
    const imbdDetails = await movieDetails(imdb);

    localStorage.setItem(imbdDetails.Title, imbdDetails)
    createFav(imbdDetails);
}

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
}

