import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarUrl from '../utils/getGravatarUrl';
import '../styles/game.css';

class GameHeader extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header className="gameHeader">
        <div className="divImg">
          <img
            src={ getGravatarUrl(email) }
            alt="avatar"
            data-testid="header-profile-picture"
          />
        </div>
        <h1 className="name" data-testid="header-player-name">{name}</h1>
        <p>
          Pontuação atual:&nbsp;
          <span data-testid="header-score">
            { score }
          </span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.gravatarEmail,
  name: state.user.name,
  score: state.user.score,
});

export default connect(mapStateToProps)(GameHeader);

GameHeader.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
