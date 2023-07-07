
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
    inputEl : document.querySelector('input'),
    scrollBtn : document.querySelector('.myBtn')

}

refs.searchForm.addEventListener('submit', onSearchFormClick);
refs.loader.addEventListener('click', onLoader );
refs.loader.style.display = 'none'


let page = 1;
let perPage = 40;
let name;

async function onSearchFormClick(evt){
evt.preventDefault();
name = refs.searchForm.elements.searchQuery.value.trim();
cleanForm()
page = 1;
if(name === ''){
    // refs.loader.style.display = 'none'
    return Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
}
try{
    const galleryImage = await fetchGalleryImg(name, page);
    let totalPages = galleryImage.data.totalHits;
    if(galleryImage.data.hits.length === 0){
        refs.inputEl.value = '';
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
    }else if(totalPages >= 1 && totalPages < 40){
        // refs.loader.style.display = 'none'
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
   try{
    const galleryItems = await fetchGalleryImg(name, page);
    let showPage =galleryItems.data.totalHits/ perPage;
    if(showPage < page){
        Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
    }
renderGallery(galleryItems.data.hits)
simpleLightBox.refresh()

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


const btnUp = {
    el: document.querySelector('.btn-up'),
    show() {
      // удалим у кнопки класс btn-up_hide
      this.el.classList.remove('btn-up_hide');
    },
    hide() {
      // добавим к кнопке класс btn-up_hide
      this.el.classList.add('btn-up_hide');
    },
    addEventListener() {
      // при прокрутке содержимого страницы
      window.addEventListener('scroll', () => {
        // определяем величину прокрутки
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
        scrollY > 400 ? this.show() : this.hide();
      });
      // при нажатии на кнопку .btn-up
      document.querySelector('.btn-up').onclick = () => {
        // переместим в начало страницы
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }
  
  btnUp.addEventListener();