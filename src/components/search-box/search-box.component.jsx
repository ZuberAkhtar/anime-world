import React from 'react';
import PropTypes from 'prop-types';
import './search-box.styles.css';

export const SearchBox = ({placeholder, handleChange, handleSubmit}) => {
    return (
        <input 
        className="search"
        type="search" 
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleSubmit}/>
    )
}

SearchBox.propTypes = {
    placeholder: PropTypes.string,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
}