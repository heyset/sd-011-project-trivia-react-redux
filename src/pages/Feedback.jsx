import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from '../components/common/Layout';
import GameHeader from '../components/GameHeader';
import getGravatarUrl from '../utils/getGravatarUrl';
import '../styles/feedback.css';

class Feedback extends Component {
  componentDidMount() {
    this.mapPropsToStorage();
  }

  mapPropsToStorage() {
    const { name, email, score } = this.props;
    let currentRanking = [];

    if (!name || !email) return;

    try {
      currentRanking = JSON.parse(localStorage.getItem('ranking'));
      if (!currentRanking) currentRanking = [];
    } catch (err) {
      console.error(err);
    }

    currentRanking.push({
      name,
      score,
      picture: getGravatarUrl(email),
    });

    currentRanking.sort((a, b) => b.score - a.score);

    localStorage.setItem('ranking', JSON.stringify(currentRanking));
  }

  renderMsg() {
    const { assertions } = this.props;
    if (assertions > 2) {
      return 'Mandou bem!';
    }
    return 'Podia ser melhor...';
  }

  render() {
    const { name, email, score, assertions } = this.props;

    if (!name || !email) return <Redirect to="/" />;

    return (
      <Layout>
        <main className="feedback">
          <GameHeader />
          <div className="scoreFinal">
            <p data-testid="feedback-text">{this.renderMsg()}</p>
            <p data-testid="feedback-total-score">
              <span>Pontuação final: </span>
              {score}
            </p>
            <p data-testid="feedback-total-question">
              <span>Acertos: </span>
              {assertions}
            </p>
          </div>
          <div className="feedbackBtns">
            <Link className="btn" to="/" data-testid="btn-play-again">
              Jogar Novamente
            </Link>
            <Link className="btn" to="/ranking" data-testid="btn-ranking">
              Ver Ranking
            </Link>
          </div>
        </main>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.gravatarEmail,
  name: state.user.name,
  assertions: state.user.assertions,
  score: state.user.score,
  token: state.user.token,
  quest: state.questions.questions,

});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;
