// impoer Notiflix
import Notiflix from 'notiflix';

// import SipleLighbox
import SimpleLightbox from 'simplelightbox';
// additional styles import
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const inputTag = document.querySelector('#search-form input');

// clearing results
const clearResults = () => {
  gallery.innerHTML = '';
};

// clear button
const clearBtn = document.querySelector('#clear-button');
clearBtn.addEventListener('click', () => {
  inputTag.value = '';
  inputTag.focus();
});

let page = 1;

// fetch function
function fetchImages(name) {
  // fetch options

  const fetchOptions = new URLSearchParams({
    key: '30479209-dd9929ca676ab60e1d3477c1b',
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 5,
    page: page,
  });

  return fetch(`https://pixabay.com/api/?${fetchOptions}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// rendering results
function renderImages(images) {
  clearResults();
  const markup = images
    .map(image => {
      return `<div class="photo-card">
                <a class="gallery__item" href="${image.largeImageURL}">
                  <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
                </a>
                <div class="info">
                  <p class="info-item">
                    <b>Likes</b><br>
                    ${image.likes}
                  </p>
                  <p class="info-item">
                    <b>Views</b><br>
                    ${image.views}
                  </p>
                  <p class="info-item">
                    <b>Comments</b><br>
                    ${image.comments}
                  </p>
                  <p class="info-item">
                    <b>Downloads</b><br>
                    ${image.downloads}
                  </p>
                </div>
            </div>`;
    })
    .join('');
  //gallery.innerHTML += markup;
  //list.insertAdjacentHTML("beforeend", markup);
  gallery.insertAdjacentElement('beforeend', markup);

  // adding simpleLightbox library
  var lightbox = new SimpleLightbox('.gallery a');
}

const search = () => {
  event.preventDefault();
  const name = inputTag.value.trim();

  if (name.length >= 1) {
    fetchImages(name)
      // rendering results
      // .then(images =>
      //   Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`)
      // )
      .then(images => {
        Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
        renderImages(images.hits);
      })
      // no result
      .catch(() =>
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        )
      );
  } else {
    Notiflix.Notify.failure('Please enter something.');
  }
};

// search button
const searchBtn = document.querySelector('#search-button');
searchBtn.addEventListener('click', search);

// load-more button
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', () => {
  page = page + 1;
  search();
});
