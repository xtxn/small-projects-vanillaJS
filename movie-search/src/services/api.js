import { API_KEY } from "../config.js"

const baseUrl = `http://www.omdbapi.com/?apikey=${API_KEY}`

export async function searchMovies(title) {
    try {
        const response = await fetch(baseUrl + '&s=' + title);
        if (!response.ok) {
            throw new Error('Can\'t connect to server')
        }
        const movies = await response.json();
        if (movies.Response === 'False') {
            throw new Error(movies.Error);
        }
        return movies.Search;

    } catch (error) {
        throw error;
    };
}

export async function movieDetails(imdbID) {
    try {
        const response = await fetch(baseUrl + '&i=' + imdbID + '&plot=full');
        if (!response.ok) {
            throw new Error('Can\'t connect to server')
        };
        const movieData = await response.json();
        if (movieData.Response === 'False') {
            throw new Error(data.Error)
        }
        return movieData;
    } catch (error) {
        throw error;
    };
}

export async function getTrailerData(imdbID) {
    const url = 'https://api.kinocheck.com/trailers?imdb_id='
    try {
        const response = await fetch(url + imdbID + '&language=en');
        if (!response.ok) {
            throw new Error('Can\'t connect to server')
        }
        const trailerData = await response.json();
        return trailerData;
    } catch (error) {
        throw error;
    }
}




