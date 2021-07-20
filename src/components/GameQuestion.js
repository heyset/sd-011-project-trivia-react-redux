import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { stopCountdownTimer, updateScore } from '../actions';

class GameQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = { assertions: 0 };
    this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  updateScore() {
    const CORRECT_SCORE = 10;
    const EASY_DIFFICULT = 1;
    const MEDIUM_DIFFICULT = 2;
    const HARD_DIFFICULT = 3;
    const { question: { difficulty }, timer, updateScoreAction } = this.props;

    let points = 0;
    switch (difficulty) {
    case 'easy':
      points = CORRECT_SCORE + (EASY_DIFFICULT * timer);
      break;
    case 'medium':
      points = CORRECT_SCORE + (MEDIUM_DIFFICULT * timer);
      break;
    case 'hard':
      points = CORRECT_SCORE + (HARD_DIFFICULT * timer);
      break;
    default:
      points = 0;
    }
    updateScoreAction(points);
  }

  checkCorrectAnswer({ target }) {
    const { actionStopCountdown } = this.props;
    actionStopCountdown();
    const { dataset: { testid: answer } } = target;
    if (answer.includes('correct')) {
      this.updateScore();
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }));
    }
    target.classList.add('clicked');

    const father = target.parentElement;
    const childs = [...father.children];
    childs.forEach((child) => {
      const { testid } = child.dataset;
      child.classList.add(testid);
      child.disabled = true;
    });
  }

  render() {
    const { question, isLoading, stopTimer } = this.props;
    const LOADING = 'Carregando as perguntas';
    const alternatives = [...question.incorrect_answers, question.correct_answer];
    // http://www.buginit.com/javascript/javascript-sort-without-mutating-array/
    const alternativesToSort = alternatives.concat().sort();
    const correctAnswer = question.correct_answer;

    return (
      <div>
        <p
          className="question-category"
          data-testid="question-category"
        >
          { question.category }
        </p>
        <p className="question" data-testid="question-text">{ question.question }</p>
        <div className="alternativesContainer">
          { isLoading ? LOADING : alternativesToSort.map((alternative) => {
            const index = alternatives.indexOf(alternative);
            return (
              <button
                key={ index }
                type="button"
                disabled={ stopTimer }
                onClick={ this.checkCorrectAnswer }
                data-testid={ alternative === correctAnswer
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
              >
                { alternative }
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.playerReducer.loading,
  timer: state.timerReducer.timer,
  stopTimer: state.timerReducer.stopTimer,
});

const mapDispatchToProps = (dispatch) => ({
  actionStopCountdown: () => dispatch(stopCountdownTimer()),
  updateScoreAction: (points) => dispatch(updateScore(points)),
});

GameQuestion.propTypes = {
  question: PropTypes.arrayOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
  stopTimer: PropTypes.func.isRequired,
  updateScoreAction: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  actionStopCountdown: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestion);
