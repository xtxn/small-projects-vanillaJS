const fallbackImgSrc = '../../noposter1.png';

export const createCard = (movie, onCardClick) => {

    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.dataset.type = `${movie.Type}`;
    card.dataset.imdb = `${movie.imdbID}`
    card.innerHTML =
        `<img src=${movie.Poster !== 'N/A' ? movie.Poster : fallbackImgSrc
        } onerror="this.onerror=null; this.src='${fallbackImgSrc}';" alt = "${movie.Title} Poster" >
    <h3 class="card-title">${movie.Title}</h3>
    <p class="card-year">${movie.Year}</p>
    <div class="btn-container">
        <button class="btn-details btn">Details</button>
        <button class="btn-add btn"><i class="fa-solid fa-heart"></i></button>
    </div>
</div > `;

    card.querySelector(".btn-container").addEventListener("click", onCardClick);

    return card;
}

