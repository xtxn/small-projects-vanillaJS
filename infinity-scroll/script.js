const count = 30;
const apiKey = '__UNSPLASH_API_KEY__';
const url = `https://api.unsplash.com/photos/random/?count=${count}&client_id=${apiKey}`;

const imgContainer = document.querySelector('.img-container');
const loaderContainer = document.querySelector('.loader-container');
const scrollTrigger = document.getElementById('scroll-trigger');

let collection = [];
let isLoading = false;


// let requestedImg = 0;
// let loadedImg = 0;
// let ready = false;

async function getImages() {
    if (isLoading) return;

    isLoading = true;
    loaderContainer.hidden = false;

    try {
        const response = await fetch(url);
        if (response.status === 403) {
            observer.unobserve(scrollTrigger);
            throw new Error('API Rate Limit Exceeded. Please try again later.');
        }
        if (!response.ok) {
            throw new Error('Can\'t connect to the server');
        }
        collection = await response.json();
        displayImages();

    } catch (error) {
        loaderContainer.hidden = true;
        alert(error.message);
    }
}

function displayImages() {
    let loadedImg = 0;
    const totalImg = collection.length;

    if (totalImg === 0) {
        isLoading = false;
        loaderContainer.hidden = true;
        observer.unobserve(scrollTrigger);
        return;
    }

    collection.forEach(image => {
        const a = document.createElement('a');
        setAttribute(a, {
            href: image.links.html,
            target: '_blank',
            rel: 'noopener noreferrer',
        });

        const img = document.createElement('img');
        setAttribute(img, {
            src: image.urls.regular,
            alt: image.alt_description,
            title: image.alt_description,
        });

        function imageLoaded() {
            loadedImg++;
            if (loadedImg === totalImg) {
                loaderContainer.hidden = true;
                isLoading = false;
            };
        }
        img.addEventListener('load', imageLoaded);

        a.appendChild(img);
        imgContainer.appendChild(a);
    });
}

function setAttribute(element, attributes) {
    Object.entries(attributes).forEach(([KeyboardEvent, value]) => {
        element.setAttribute(KeyboardEvent, value);
    });
}


const options = {
    root: null,
    rootMargin: '0px 0px 1000px 0px',
    threshold: 0,
}

const observer = new IntersectionObserver(entries => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && !isLoading) {
        getImages();
    }
}, options);

observer.observe(scrollTrigger);

getImages();

