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
        // TODO handle error display
        console.log(error.message);
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
        // TODO handle error display
        console.log(error.message);
    };
}




