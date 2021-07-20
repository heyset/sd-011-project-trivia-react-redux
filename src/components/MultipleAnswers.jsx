import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const fiftyPercent = 0.5;
const caseTrue = 1;
const caseFalse = -1;
const correctAnswer = 'correct-answer';

class MultipleAnswers extends React.Component {
  getAnswers() {
    const { question } = this.props;
    const answers = [question.correct_answer, ...question.incorrect_answers];

    /*
      shuffle array js
      source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    */
    return answers.sort(() => (Math.random() > fiftyPercent ? caseTrue : caseFalse));
  }

  render() {
    const { question, disabled, handleQuestionAnswered } = this.props;

    return (
      <>
        {
          this.getAnswers().map((answer, index) => (
            <button
              key={ index }
              type="button"
              onClick={ handleQuestionAnswered }
              disabled={ disabled }
              data-testid={
                question.incorrect_answers.includes(answer)
                  ? `wrong-answer-${question.incorrect_answers.indexOf(answer)}`
                  : correctAnswer
              }
            >
              { answer }
            </button>
          ))
        }
      </>
    );
  }
}

const mapStateToProps = ({ gameReducer: { question } }) => ({
  question,
});

export default connect(mapStateToProps)(MultipleAnswers);

MultipleAnswers.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }),
  disabled: PropTypes.bool,
  handleQuestionAnswered: PropTypes.func,
}.isRequired;
