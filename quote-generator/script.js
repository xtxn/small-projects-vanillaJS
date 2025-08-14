const quoteField = document.getElementById('quote');
const authorField = document.getElementById('author');
const quoteContainer = document.getElementById('quote-container')

const btnQuote = document.getElementById('generate-quote');
const btnTwitter = document.querySelector('.twitter-share-button');

const loader = document.querySelector('.loader');

let allQuotes = [];

function displayRandomQuote() {
    loading();
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    const currentQuote = allQuotes[randomIndex];

    if (currentQuote.text.length > 120) {
        quoteField.classList.add('long-quote');
    } else {
        quoteField.classList.remove('long-quote');
    }

    quoteField.textContent = currentQuote.text;
    authorField.textContent = currentQuote.author || 'Unknown';

    complete();
}

async function getAllQuotes() {
    loading();
    const url = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(url);
        allQuotes = await response.json();
        displayRandomQuote();
    } catch (error) {
        alert(error.message);
    }
}

function onShare(event) {
    event.preventDefault();

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteField.textContent} - ${authorField.textContent}`;

    window.open(twitterUrl, '_blank');
}

function loading() {
    loader.style.display = 'inline-block';
    quoteContainer.style.display = 'none';
}

function complete() {
    loader.style.display = 'none';
    quoteContainer.style.display = 'inline-block';
}

btnQuote.addEventListener('click', displayRandomQuote);
btnTwitter.addEventListener('click', onShare);

getAllQuotes();

