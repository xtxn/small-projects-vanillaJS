export function createFavItem(movie, onRemove) {
    if (!movie || !movie.Title) {
        console.error("Attempted to create a favorite item with invalid data.", movie);
        const emptyItem = document.createElement('li');
        emptyItem.textContent = 'Invalid favorite entry.';
        return emptyItem;
    }

    const liFav = document.createElement('li');
    liFav.classList.add("fav-item");
    liFav.innerHTML = `
        <span>${movie.Title} (${movie.Year})</span>
        <button class="fav-remove btn">Remove</button>
    `;

    liFav.querySelector('.fav-remove').addEventListener('click', onRemove);

    return liFav;
};

