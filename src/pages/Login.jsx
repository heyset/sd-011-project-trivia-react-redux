import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/login.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changeEmail, changeName, clearPlayer, getToken } from '../redux/actions';

library.add(fas);

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.verifyUser = this.verifyUser.bind(this);
    this.setGlobalUser = this.setGlobalUser.bind(this);
  }

  componentDidMount() {
    const { clearPlayerState } = this.props;
    clearPlayerState();
  }

  setGlobalUser() {
    const { handleEmail, handleName, handleToken } = this.props;
    const { name, email } = this.state;
    handleToken();
    handleEmail(email);
    handleName(name);
  }

  verifyUser() {
    const { name, email } = this.state;
    if (email.length > 0 && name.length > 0) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div title="Login">
        <div className="divConfig">
           <Link to="/Config">
            <button className="btnConfig" type="button" data-testid="btn-settings">
                <FontAwesomeIcon icon="cogs" />
            </button>
          </Link>
        </div>
        <main>
          <div>
            <div className="wave">
              <h2 className="logo">Trivia</h2>
              <h2 className="logo">Trivia</h2>
            </div>
          </div>
          <form>
            <label htmlFor="userEmail">
              <span>Email do Gravatar:</span>
              <input
                data-testid="input-gravatar-email"
                placeholder="trivia@trivia19.com"
                onChange={ (e) => this.setState({ email: e.target.value }) }
              />
            </label>
            <label htmlFor="userName">
              <span>Nome do Jogador:</span>
              <input
                data-testid="input-player-name"
                placeholder="Nome"
                onChange={ (e) => this.setState({ name: e.target.value }) }
              />
            </label>
          </form>
          <Link to="/game">
            <button
              className="submitBtn"
              data-testid="btn-play"
              type="button"
              disabled={ this.verifyUser() }
              onClick={ this.setGlobalUser }
            >
              JOGAR
            </button>
          </Link>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearPlayerState: () => dispatch(clearPlayer()),
  handleEmail: (payload) => dispatch(changeEmail(payload)),
  handleName: (payload) => dispatch(changeName(payload)),
  handleToken: () => dispatch(getToken()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  clearPlayer: PropTypes.func,
  handleEmail: PropTypes.func,
  handleName: PropTypes.func,
  handleToken: PropTypes.func,
}.isRequired;
