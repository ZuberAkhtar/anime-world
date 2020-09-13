import React from 'react';
import PropTypes from 'prop-types';
import './card-list.styles.css';
import {Card} from '../card/card.component'

export const CardList = (props) => {
    return (
        <div className='card-list'>{
            props.animeList.map(anime => {
                return (
                    <Card key={anime.mal_id} anime={anime}/>
                )
            })
        }</div>
    )
}

CardList.propTypes = {
    animeList: PropTypes.array,
}