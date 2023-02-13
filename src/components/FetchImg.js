import axios from 'axios';
export { fetchImg };

const BASE_URL = 'https://pixabay.com/api/'; 
const KEY = '32051710-2614f6ab005cb570915111ece';
    
async function fetchImg(query, page, perPage) {
    try {
        const response = await axios.get(
        `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
        );
        // console.log(response.data)
        return response;
        
    }
    catch (error) {
        console.log(error);
    }
}