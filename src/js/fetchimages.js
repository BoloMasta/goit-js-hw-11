import Notiflix from 'notiflix';

const axios = require('axios').default;

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
    if (response.data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (response.data.totalHits > 0 && page === 1)
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
