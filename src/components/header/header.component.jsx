import React from 'react';
import './header.styles.css';

export const Header = (props) => {
    return (
        <div className='header-container'>
            {props.children}
        </div>
    )
}