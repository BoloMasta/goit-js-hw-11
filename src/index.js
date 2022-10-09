import Notiflix from 'notiflix';

const gallery = document.querySelector('.gallery');
const inputTag = document.querySelector('#search-form input');

// cleaning results
const clearResult = () => {
  gallery.innerHTML = '';
};

// clear button
const clearBtn = document.querySelector('#clear-button');
clearBtn.addEventListener('click', () => {
  clearResult();
  inputTag.value = '';
  inputTag.focus();
});

// fetch function
function fetchImages(name) {
  // fetch options
  const fetchOptions = new URLSearchParams({
    key: '30479209-dd9929ca676ab60e1d3477c1b',
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${fetchOptions}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    console.log(`https://pixabay.com/api/?${fetchOptions}`);
    return response.json();
  });
}

// rendering results
function renderImages(images) {
  clearResult();
  console.log(images.hits[2].webformatURL);

  const markup = images
    .map(image => {
      return `<div class="photo-card">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                    </p>
                </div>
            </div>`;
    })
    .join('');
  gallery.innerHTML = markup;
}

const type = () => {
  const name = inputTag.value.trim();
  if (name.length >= 1) {
    fetchImages(name)
      // rendering results
      .then(images => renderImages(images))

      // no result
      .catch(() =>
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        )
      );
  } else {
    clearResult();
  }
};

// debounce
var debounce = require('lodash.debounce');
var debounced = debounce(type, 600);
inputTag.addEventListener('input', debounced);
