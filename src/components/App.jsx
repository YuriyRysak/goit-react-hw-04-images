import { useState, useEffect} from 'react';
import {ImagesService} from './services/api';
import {Searchbar} from './Searchbar/Searchbar';
import {Loader} from './Loader/Loader';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal.jsx';
import {animateScroll} from 'react-scroll'



 export const App =() => {

  const [searchImg, setSearchImg] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('largeImageURL');
  // const [id, setId] = useState(null);
  const per_page = 12;
 
  useEffect(() => {

    const getImages = async (searchImg, page) => {
      if (!searchImg) {
        return;
      }
      setIsLoading(true);

      try {
        const { hits, totalHits } = await ImagesService(searchImg, page);
         if (hits.length === 0) {
          return alert('Enter a search query (');
         }
          setImages(prevImages => [...prevImages, ...hits]);
          setLoadMore(page < Math.ceil(totalHits / per_page));
      } catch (error) {
        setError({ error });
      } finally {
        setIsLoading(false);
      }
    };

    getImages(searchImg, page);
  }, [searchImg, page]);

 
 
    const onFormSubmit = searchImg => {
        setSearchImg(searchImg);
        setImages([]);
        setPage(1);
        setLoadMore(false);
    };

   const onloadMore = () => {
      setPage(prevPage =>  prevPage + 1);
      scrollOnMoreButton();
    };

    const scrollOnMoreButton = () => {
      animateScroll.scrollToBottom({
        duration: 1000,
        delay: 10,
        smooth: 'linear',
      });
    };
    
    const imageModalOpen = largeImageURL => {
          setShowModal(true);
          setLargeImageURL(largeImageURL);
        
    }; 
    const closeModal = () => {
         setShowModal(false);
      
    };
  
   
              
      return (
        <div>
          <Searchbar onSubmit={onFormSubmit}/>
          {isLoading && <Loader />}
        
          <ImageGallery images={images} openModal={imageModalOpen} />
        

        {loadMore && <Button onloadMore={onloadMore} page={page} />}

         {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={closeModal} />
        )} 
          
          {error && <p>Whoops, something went wrong: {setError}</p>}
          
          
        </div> 
      );
    
  };
