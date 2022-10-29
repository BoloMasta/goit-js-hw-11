// impoer Notiflix
import Notiflix from 'notiflix';

// import functions and variables
import { fetchImages, lastIndexPage } from './js/fetchimages';
import { renderImages } from './js/renderImages';

// handles
const gallery = document.querySelector('.gallery');
const inputTag = document.querySelector('#search-form input');
const clearBtn = document.querySelector('#clear-button');
const searchBtn = document.querySelector('#search-button');
const loadMoreBtn = document.querySelector('.load-more');

export let page = 1;

// serach function
const search = () => {
  event.preventDefault();
  loadMoreBtn.style.display = 'none';

  const name = inputTag.value.trim();

  fetchImages(name, page)
    .then(images => {
      renderImages(images.hits);
      if (page < lastIndexPage) {
        loadMoreBtn.style.display = 'block';
      }
    })
    .catch(error => console.log(error));
};

// listeners
inputTag.addEventListener('input', () => {
  if (inputTag.value.length >= 1) {
    clearBtn.style.display = 'block';
  }
});

searchBtn.addEventListener('click', () => {
  event.preventDefault();

  // chech length of input
  if (inputTag.value.trim().length >= 1) {
    gallery.innerHTML = '';
    search();
  } else {
    Notiflix.Notify.failure('Please enter something.');
  }
});

clearBtn.addEventListener('click', () => {
  inputTag.value = '';
  inputTag.focus();
  clearBtn.style.display = 'none';
});

loadMoreBtn.addEventListener('click', () => {
  page = page + 1;
  search();
});
