import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '32051710-2614f6ab005cb570915111ece',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const ImagesService = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
  
};

