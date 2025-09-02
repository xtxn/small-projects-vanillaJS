import { getTrailerData } from "../../services/api.js";

const modalTarget = document.getElementById('movie-modal');
const fallbackImgSrc = '../../noposter1.png';

export async function openModal(movieInfo, onFavClick) {
    modalTarget.replaceChildren("");

    let ytID = null;
    try {
        const trailersData = await getTrailerData(movieInfo.imdbID);
        if (!trailersData.message?.includes("No trailers found")) {
            ytID = trailersData[0]?.youtube_video_id;
        }
    } catch (error) {
        console.warn('Could not fetch trailer data.');
    }

    const divContent = document.createElement('div');
    divContent.classList.add("modal-content");
    divContent.innerHTML = `
    <button id="modal-close-btn" class="modal-close-btn">&times;</button>
    <div id="modal-body">
        <!-- Populate movie details -->
        <img img src=${movieInfo.Poster !== 'N/A' ? movieInfo.Poster : fallbackImgSrc
        } onerror="this.onerror=null; this.src='${fallbackImgSrc}';" alt = "${movieInfo.Title} Poster"  class="img-details img">
        <section class="modal-info">
            <h2 class="modal-movie-title">${movieInfo.Title}(${movieInfo.Year})</h2>
            <div class="movie-info">
                <span class="imdb bubble">imdb: ${movieInfo.imdbRating}</span>
                <span class="box-office bubble">BoxOffice: ${movieInfo.BoxOffice}</span>
                <span class="type bubble">Type: ${movieInfo.Type}</span>
            </div>
            <p class="modal-movie-description">
                ${movieInfo.Plot}
            </p>
            <p class="movie-info">
                <button class="btn-trailer">Trailer<i class="fa-solid fa-play"></i></button>
                <button class="btn-fav">Add<i class="fa-solid fa-heart"></i></button>
            </p>
        </div>
    </div>`
    modalTarget.appendChild(divContent);

    document.getElementById("modal-close-btn").addEventListener('click', closeModal);
    document.querySelector(".btn-trailer").addEventListener('click', () => playTrailer(ytID));
    document.querySelector(".btn-fav").addEventListener('click', onFavClick);

}

function closeModal() {
    modalTarget.classList.add("hidden");
}

function playTrailer(ytID) {
    if (ytID) {
        window.open(`https://www.youtube.com/watch?v=${ytID}`, '_blank');
    } else {
        throw error;
    }
}

