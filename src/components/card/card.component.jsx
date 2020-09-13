import React from 'react';
import PropTypes from 'prop-types';
import './card.styles.css';

export const Card = (props) => {
    return (
        <div className="card-container">
            <img className="card-img" src={props.anime.image_url} alt="anime-poster"/>
         <span className="card-title">{props.anime.title}</span>    
        </div>
    )
}

Card.propTypes = {
    anime: PropTypes.object,
}