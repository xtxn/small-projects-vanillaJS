// TODO Modal template

const modalTarget = document.getElementById('movie-modal');
const fallbackImgSrc = '../../noposter1.png';
let imdbID = '';

export function openModal(movieInfo, ytID) {
    // ytID = ytID;
    imdbID = movieInfo.imdbID;
    modalTarget.replaceChildren("");
    const divContent = document.createElement('div');
    divContent.classList.add("modal-content");
    divContent.innerHTML = `
    <button id="modal-close-btn" class="modal-close-btn">&times;</button>
    <div id="modal-body">
        <!-- Populate movie details -->
        <img img src=${movieInfo.Poster !== 'N/A' ? movieInfo.Poster : fallbackImgSrc
        } onerror="this.onerror=null; this.src='${fallbackImgSrc}';" alt = "${movieInfo.Title} Poster"  class="img-details img">
        <section class="modal-info">
            <h2 class="modal-movie-title">${movieInfo.Title}</h2>
            <div class="movie-info">
                <span class="imdb bubble">imdb: ${movieInfo.imdbRating}</span>
                <span class="box-office bubble">BoxOffice: ${movieInfo.BoxOffice}</span>
                <span class="type bubble">Type: movie</span>
            </div>
            <p class="modal-movie-description">
                ${movieInfo.Plot}
            </p>
            <p class="movie-info">
                <button class="btn-trailer">Trailer<i class="fa-solid fa-play"></i>
                </button>
                <button class="btn-fav">Add<i class="fa-solid fa-heart"></i>
                </button>
            </p>
        </div>
    </div>`
    modalTarget.appendChild(divContent);

    document.getElementById("modal-close-btn").addEventListener('click', closeModal);
    document.querySelector(".btn-trailer").addEventListener('click', () => playTrailer(ytID))
}

function closeModal() {
    modalTarget.classList.add("hidden");
}

function playTrailer(ytID) {
    if (ytID !== null) {
        window.open(`https://www.youtube.com/watch?v=${ytID}`, '_blank');
    }
}
