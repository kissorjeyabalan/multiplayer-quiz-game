import React from 'react';
import PropTypes from 'prop-types';

const Question = (props) => {
    const {question, onAnswer} = props;

    return(
        <div>
            <h2>Question: {question.question}</h2>
            <div className="btnPart">
                {question.answers.map((answer, index) =>
                    <div className="btn fullWidth fullHeight" key={index} onClick={() => onAnswer(index)}>{answer}</div>
                )}
            </div>
        </div>
    );
};

Question.propTypes = {
    question: PropTypes.object.isRequired,
    onAnswer: PropTypes.func.isRequired
};

export default Question;