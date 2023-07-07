import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38060997-efaa6414bf9eafc84e286c70f';

export async function fetchGalleryImg(name, page){
    try{
        const response = await axios(
            `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
          );
          return response;
      
    }
    catch(error){
        console.log(error)
    }
}


// export async function fetchGalleryImg(name, page) {
//     const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '38060997-efaa6414bf9eafc84e286c70f';
//     try {
//         const response = await axios (
//             `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
//           );
 
//       return response;
//     } catch (error) {
//       console.log(error);
//     }
//   }



// export async function fetchGalleryImg(name, page) {
//     const url = 'https://pixabay.com/api/';
//     const key = '38060997-efaa6414bf9eafc84e286c70f';
//     const filter = `?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  
//     return await axios (`${url}${filter}`);
//   }


// export async function fetchGalleryImg(name, page) {
//     const API_URL = 'https://pixabay.com/api/';
//     const options = {
//       params: {
//         key: '38060997-efaa6414bf9eafc84e286c70f',
//         q: name,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//         page: page,
//         per_page: 40,
//       },
//     };
  
//     try {
//       const response = await axios(API_URL, options);
//       return response;
  
//     } catch (error) {
//       console.log(error);
//     }
//   }


















