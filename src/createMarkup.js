import { refs } from "./index";
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createMarkup(images){
   return images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `<a class = "js-gallery" href="${largeImageURL}">  
   <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width = "400" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
          <b>Views</b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
      </div></a>`
    ).join('');

}
export function renderGallery(images){
    refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(images))
}