import React, { Component } from 'react';
import {ImagesService} from './services/api';
import {Searchbar} from './Searchbar/Searchbar';
import {Loader} from './Loader/Loader';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal.jsx';



 export class App extends Component {
 

  state = {
    searchImg: '',
    images: [],
    page: 1,
    per_page: 12,    
    isLoading: false,
    error: null,
    showModal: false,
    loadMore: false,
    largeImageURL: 'largeImageURL',
    id: null,
  };

  
   componentDidUpdate(_, prevState) {
    // console.log(prevState.page);
    // console.log(this.state.page);
    const { searchImg, page } = this.state;
    if (prevState.searchImg !== searchImg || prevState.page !== page) {
      this.getImages(searchImg, page);
    }
  }
    getImages = async (query, page) => {
      this.setState({ isLoading: true });
      if (!query) {
        return;
      }

      try {
        const { hits, totalHits } = await ImagesService(query, page);
        // console.log(hits, totalHits);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    onFormSubmit = searchImg => {
      // console.log(searchImg)
      this.setState ({
        searchImg,
        images: [],
        page: 1,
        loadMore: false,
      });
      // console.log(query)
     };

    onloadMore = () => {
      this.setState(prevState => ({ page: prevState.page + 1 }));
      this.scrollOnMoreButton();
    };
    
    imageModal = (largeImageURL) => {
      this.setState(({ showModal, }) => ({
        showModal: !showModal,
        largeImageURL: largeImageURL,
      }));
    }; 
    closeModal = () => {
      this.setState({
        showModal: false,
      });
    };
  
    render() {
      const { images, isLoading, loadMore, showModal, page, largeImageURL } = this.state;
        
      return (
        <div>
          <Searchbar onSubmit={this.onFormSubmit}/>
          {isLoading && <Loader />}
        
          <ImageGallery images={images} openModal={this.imageModal} />
        

        {loadMore && <Button onloadMore={this.onloadMore} page={page} />}

         {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )} 
          
          {/* {error && <p>Whoops, something went wrong: {error.message}</p>}
          {isLoading && <Loader/>} */}
          
        </div> 
      );
    }
  }
