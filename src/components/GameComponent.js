import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.colorSelectCorrect = this.colorSelectCorrect.bind(this);
  }

  colorSelectCorrect() {
    const btns = document.querySelectorAll('button');
    btns.forEach((element) => {
      element.classList.add('revel-color');
    });
  }

  render() {
    const { questions, loading } = this.props;
    const { results } = questions;

    return (
      <div>
        {loading
          ? <p>Carregando...</p>
          : (
            <div>
              <p data-testid="question-category">{ results[0].category }</p>
              <h4 data-testid="question-text">{ results[0].question }</h4>
              <button
                data-testid="correct-answer"
                type="button"
                className="green-border"
                onClick={ () => this.colorSelectCorrect() }
              >
                { results[0].correct_answer }
              </button>
              { results[0].incorrect_answers.map((incorrect, indexKey) => (
                <button
                  data-testid={ `wrong-answer-${indexKey}` }
                  type="button"
                  key={ indexKey }
                  className="red-border"
                  onClick={ () => this.colorSelectCorrect() }
                >
                  {incorrect}
                </button>
              ))}
            </div>
          )}
      </div>
    );
  }
}

GameComponent.propTypes = {
  questions: PropTypes.arrayOf().isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
  loading: state.triviaReducer.isLoading,
});

export default connect(mapStateToProps)(GameComponent);
