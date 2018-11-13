import React from 'react';
import PropTypes from 'prop-types';

const Score = (props) => {
    const {score} = props;

    return(
        <h2>score: {score}</h2>
    );
};

Score.propTypes = {
    score: PropTypes.number
};

export default Score;