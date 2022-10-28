// impoer Notiflix
import Notiflix from 'notiflix';

// import SipleLighbox
import SimpleLightbox from 'simplelightbox';
// additional styles import
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/fetchimages';
import { renderImages } from './js/renderImages';

const gallery = document.querySelector('.gallery');
const inputTag = document.querySelector('#search-form input');
const clearBtn = document.querySelector('#clear-button');
const searchBtn = document.querySelector('#search-button');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;

const search = () => {
  event.preventDefault();
  loadMoreBtn.style.display = 'none';

  const name = inputTag.value.trim();

  if (name.length >= 1) {
    fetchImages(name, page)
      .then(images => {
        // Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
        renderImages(images.hits);
      })
      .catch(error => console.log(error));
  } else {
    Notiflix.Notify.failure('Please enter something.');
  }
};

inputTag.addEventListener('input', () => {
  if (inputTag.value.length >= 1) {
    clearBtn.style.display = 'block';
  }
});

clearBtn.addEventListener('click', () => {
  inputTag.value = '';
  inputTag.focus();
  clearBtn.style.display = 'none';
});

searchBtn.addEventListener('click', () => {
  gallery.innerHTML = '';
  search();
});

loadMoreBtn.addEventListener('click', () => {
  page = page + 1;
  search();
});
