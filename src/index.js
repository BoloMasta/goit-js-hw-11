import Notiflix from 'notiflix';

const inputTag = document.querySelector('#search-form')



// debounce
var debounce = require('lodash.debounce');
var debounced = debounce(type, 600);
inputTag.addEventListener('input', debounced);
