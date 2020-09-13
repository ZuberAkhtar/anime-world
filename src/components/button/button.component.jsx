import React from 'react';
import PropTypes from 'prop-types';
import './button.styles.css';

export const Button = (props) => {
    return (
        <button
            className='button-container'
            onClick={props.handleClick}
            disabled={props.disable}
        >
            {props.text}
        </button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    disable: PropTypes.bool,
    handleClick: PropTypes.func,
}