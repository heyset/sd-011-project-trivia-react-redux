import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/game.css';

class QuestionDescription extends React.Component {
  render() {
    const { questions, index } = this.props;

    return (
      <div className="questions">
        <p>
          <span data-testid="question-category">
            {questions[index].category}
          </span>
        </p>
        <p>
          <span data-testid="question-text">
            {questions[index].question}
          </span>
        </p>
      </div>
    );
  }
}

QuestionDescription.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
  })),
  index: PropTypes.number,
}.isRequired;

export default QuestionDescription;
