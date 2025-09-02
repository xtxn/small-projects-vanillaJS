const FAVORITES_KEY = 'movieFavorites';

function loadFavorites() {
    const favoritesJSON = localStorage.getItem(FAVORITES_KEY);
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function addFavorites(movie) {
    const favorites = loadFavorites();
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
        favorites.push(movie);
        saveFavorites(favorites);
        return true;
    }
    return false;
}

export function removeFavorites(imdbID) {
    let favorites = loadFavorites();
    favorites = favorites.filter(fav => fav.imdbID !== imdbID);
    saveFavorites(favorites);
}

export function isFavorite(imdbID) {
    const favorites = loadFavorites();
    return favorites.some(fav => fav.imdbID === imdbID);
}

export function getAllFavorites() {
    return loadFavorites();
}