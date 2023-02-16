import {useState} from "react";
import PropTypes from 'prop-types';
import './Searchbar.css';




export const Searchbar = ({onSubmit}) => {

    const [searchImg, setSearchImg] = useState('');



    const handleImageChange = event => {
        setSearchImg(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if(searchImg.trim() === '') {
            return alert('Please enter something!');
        }
        onSubmit(searchImg);
        setSearchImg('');
    };
    
        return(
            <header className="Searchbar">
                <form onSubmit={handleSubmit} className="SearchForm">
                    <button type="submit" className="SearchForm-button">
                    <span className="button-label"></span>
                    </button>

                    <input
                    class="SearchForm-input "
                    type="text"
                    autocomplete="off"
                    autofocus="off"
                    placeholder="Search images and photos"
                    value={searchImg}
                    onChange={handleImageChange}
                    />
                </form>
            </header>
        );


    
}
Searchbar.propTypes = {
    onFormSubmit: PropTypes.func,
  };
