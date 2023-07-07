
import { renderGallery } from "./createMarkup";
import { fetchGalleryImg } from "./api-servise";
import { Notify } from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const simpleLightBox = new SimpleLightbox('.gallery a', {captionDelay: 250,
  });
  

export const refs = { 
    searchForm : document.querySelector('#search-form'),
    submitBtn : document.querySelector('button'),
    galleryEl : document.querySelector('.gallery'),
    loader : document.querySelector('.load-more'),
    inputEl : document.querySelector('input')
}

refs.searchForm.addEventListener('submit', onSearchFormClick);
refs.loader.addEventListener('click', onLoader );



let page = 1;
let perPage = 40;

async function onSearchFormClick(evt){
evt.preventDefault();

let name = refs.searchForm.elements.searchQuery.value.trim();

cleanForm()
page = 1;
if(name === ''){
    refs.loader.style.display = 'none'
    return Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
   
}
try{
    const galleryImage = await fetchGalleryImg(name, page);
    let totalPages = galleryImage.data.totalHits;
    if(galleryImage.data.hits.length === 0){
        cleanForm()
        Notify.failure(`sorry, there are no images`)
    }else if(totalPages >= 1 && totalPages < 40){
        refs.loader.style.display = 'none'
        Notify.success(`Hooray! We found ${totalPages} image.`);
    } else if(totalPages > 40){
        refs.loader.style.display = 'block'
        Notify.success(`Hooray! We found ${totalPages} image.`);
    }
    renderGallery(galleryImage.data.hits);
    simpleLightBox.refresh()
}
catch(error){
    console.log(error); Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
}
}





async function onLoader(){
   page +=1 ;
   let name = refs.searchForm.elements.searchQuery.value.trim();

   try{
    const galleryItems = await fetchGalleryImg(name, page);
    let showPage =galleryItems.data.totalHits/ perPage;
    if(showPage < page){
        refs.loader.style.display = 'none'
        Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
          
    
    }
renderGallery(galleryItems.data.hits)


   }
   catch(error){
    console.log(error);
    Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
   }

}

function cleanForm(){
    page = 1;
    refs.galleryEl.innerHTML  = '';
    refs.loader.style.display = 'none'
}


