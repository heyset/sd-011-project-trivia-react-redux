/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Layout from '../components/common/Layout';
import QuestionDescription from '../components/Game/QuestionDescription';
import { getQuestions, changeScore, changeAssertions } from '../redux/actions';
import createStopwatch from '../utils/stopwatch';
import shuffle from '../utils/shuffle';
import './Game.css';
import GameHeader from '../components/GameHeader';
import '../styles/game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
      alternatives: [],
      hasPicked: false,
      remainingTime: null,
      stopwatch: null,
      currentQuestionIndex: 0,
      assertions: 0,
      shouldRedirect: false,
    };
    this.initializeState = this.initializeState.bind(this);
    this.handlePickOption = this.handlePickOption.bind(this);
    this.handleStopwatchEnd = this.handleStopwatchEnd.bind(this);
    this.handleStopwatchTick = this.handleStopwatchTick.bind(this);
    this.handleForwardsButton = this.handleForwardsButton.bind(this);
    this.handleStopwatchReset = this.handleStopwatchReset.bind(this);
    this.mapStateToStorage = this.mapStateToStorage.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  async componentDidMount() {
    const { token, handleQuestions, type, difficulty, category } = this.props;
    this.mapStateToStorage();
    await handleQuestions({ token, type, difficulty, category });
    this.initializeState();
  }

  componentWillUnmount() {
    const { stopwatch, assertions } = this.state;
    const { handleAssertions } = this.props;
    if (stopwatch) stopwatch.stop();
    handleAssertions(assertions);
  }

  getScore() {
    const { questions, currentQuestionIndex, remainingTime } = this.state;
    const difficultyMultipliers = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const { difficulty } = questions[currentQuestionIndex];
    const constScore = 10;
    const actualScore = constScore + (remainingTime * difficultyMultipliers[difficulty]);
    return actualScore;
  }

  mapStateToStorage() {
    const { assertions } = this.state;
    const { score, name, email } = this.props;
    const localStorageState = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(localStorageState));
  }

  handleStopwatchEnd() {
    this.setState({
      hasPicked: true,
    });
  }

  handleStopwatchTick(remainingTime) {
    this.setState({
      remainingTime,
    });
  }

  handleStopwatchReset(initialTime) {
    this.setState({
      remainingTime: initialTime,
    });
  }

  handleForwardsButton() {
    const { stopwatch, currentQuestionIndex, questions } = this.state;

    if (currentQuestionIndex === questions.length - 1) {
      this.setState({ shouldRedirect: true });
      return;
    }
    if (currentQuestionIndex > questions.length - 2) return;
    this.setState(({ currentQuestionIndex: index }) => ({
      currentQuestionIndex: index + 1,
      hasPicked: false,
    }));
    stopwatch.reset().start();
  }

  initializeState() {
    const { quest } = this.props;
    const TIME_TO_CHOOSE = 30;
    const callbacks = {
      tick: this.handleStopwatchTick,
      end: this.handleStopwatchEnd,
      reset: this.handleStopwatchReset,
    };

    this.setState({
      questions: quest,
      loading: false,
      alternatives: quest.map((alt) => (
        shuffle([...alt.incorrect_answers, alt.correct_answer]))),
      remainingTime: TIME_TO_CHOOSE,
      stopwatch: createStopwatch(TIME_TO_CHOOSE, callbacks).start(),
    });
  }

  handlePickOption({ target }) {
    const { stopwatch } = this.state;
    const { handleScoreToState } = this.props;
    stopwatch.stop();

    if (target.dataset.testid === 'correct-answer') {
      const increaseScore = this.getScore();
      handleScoreToState(increaseScore);
      this.setState(({ assertions }) => ({
        assertions: assertions + 1,
        hasPicked: true,
      }), () => {
        this.mapStateToStorage();
      });
    } else {
      this.setState({
        hasPicked: true,
      });
    }
  }

  renderButtons(answer, index) {
    const { questions, hasPicked, currentQuestionIndex } = this.state;
    if (answer === questions[currentQuestionIndex].correct_answer) {
      return (
        <button
          onClick={ this.handlePickOption }
          key={ index }
          type="button"
          data-testid="correct-answer"
          className={ `choices--correct${hasPicked ? '--picked' : ''}` }
          disabled={ hasPicked }
        >
          {answer}
        </button>);
    }
    return (
      <button
        onClick={ this.handlePickOption }
        key={ index }
        data-testid={ `wrong-answer-${index}` }
        type="button"
        className={ `choices--wrong${hasPicked ? '--picked' : ''}` }
        disabled={ hasPicked }
      >
        { answer }
      </button>);
  }

  render() {
    const { questions, loading, alternatives, remainingTime,
      hasPicked, currentQuestionIndex: index, shouldRedirect } = this.state;
    const { name, email } = this.props;
    if (!name || !email) return <Redirect to="/" />;
    if (shouldRedirect) return <Redirect to="/feedback" />;
    const isFinished = index === questions.length - 1;
    return (
      <Layout title="Game">
        <main className="game">
          { loading ? <div className="loading"><span>Carregando...</span></div>
            : (
              <div>
                <GameHeader />
                <QuestionDescription index={ index } questions={ questions } />
                <div>
                  { alternatives[index]
                    .map((answer, btnIndex) => this.renderButtons(answer, btnIndex)) }
                </div>
                <p className="time">
                  <span>Tempo restante:&nbsp;</span>
                  <span className="remainingTime">{ remainingTime }</span>
                </p>
                {hasPicked
                  ? (
                    <button
                      className="btnNext"
                      title={ `${isFinished
                        ? 'Ver resultados'
                        : 'Ir para próxima pergunta'}` }
                      type="button"
                      data-testid="btn-next"
                      onClick={ this.handleForwardsButton }
                    >
                      { isFinished
                        ? 'Resultado'
                        : 'Próxima'}
                    </button>)
                  : null}
              </div>)}
        </main>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.gravatarEmail,
  name: state.user.name,
  score: state.user.score,
  token: state.user.token,
  quest: state.questions.questions,
  category: state.config.category,
  type: state.config.type,
  difficulty: state.config.difficulty,
});

const mapDispatchToProps = (dispatch) => ({
  handleQuestions: (userToken) => dispatch(getQuestions(userToken)),
  handleScoreToState: (score) => dispatch(changeScore(score)),
  handleAssertions: (assertion) => dispatch(changeAssertions(assertion)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
