import Notiflix from 'notiflix';

const axios = require('axios').default;

export let lastIndexPage = 1;

// function fetchImages with params
export async function fetchImages(name, page) {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      method: 'get',
      params: {
        key: '30479209-dd9929ca676ab60e1d3477c1b',
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });

    // no results
    if (response.data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    // show total results on first page
    if (response.data.totalHits > 0 && page === 1)
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );

    // lastIndexPage seting
    if (response.data.totalHits % 40 === 0) {
      lastIndexPage = response.data.totalHits / 40;
    } else {
      lastIndexPage = Math.floor(response.data.totalHits / 40) + 1;
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
