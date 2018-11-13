import React from 'react';
import PropTypes from 'prop-types';

const Timer = (props) => {
    const {timer, playerFinished} = props;
    return(
        <div>
        {
            !playerFinished ?
                <h2>Remaining time: {timer}</h2>
            :
                ""
        }
        </div>

    );
};

Timer.propTypes = {
    timer: PropTypes.number,
    playerFinished: PropTypes.bool
};


export default (Timer);