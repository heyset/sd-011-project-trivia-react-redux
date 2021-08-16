import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/config.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changeCategory, changeDifficulty, changeType } from '../redux/actions';

library.add(fas);

class Config extends Component {
  constructor() {
    super();
    this.state = {
      category: [],
      loading: true,
      categorySelected: '',
      difficulty: '',
      type: '',
      buttonLoading: false,
    };
    this.fetchCategory = this.fetchCategory.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.submitConfig = this.submitConfig.bind(this);
  }

  componentDidMount() {
    this.fetchCategory();
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async fetchCategory() {
    const request = await fetch('https://opentdb.com/api_category.php');
    const response = await request.json();
    const data = response.trivia_categories;
    this.setState({
      category: data,
      loading: false,
    });
  }

  async submitConfig() {
    const { categorySelected, difficulty, type } = this.state;
    const { handleDifficulty, handleType, handleCategory } = this.props;
    this.setState({ buttonLoading: true });
    const req = await fetch(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&category=${categorySelected}&type=${type}`);
    const resp = await req.json();
    if (resp.response_code === 1) {
      this.setState({ buttonLoading: false });
      alert('Configurações invalidas! Tente novamente.');
      return;
    }
    handleDifficulty(difficulty);
    handleType(type);
    handleCategory(categorySelected);
    this.setState({ buttonLoading: false });
    alert('Boa escolha!');
  }

  render() {
    const { loading, category, buttonLoading } = this.state;
    return (
      <div>
        <div className="btnBackDiv">
          <Link className="btnBack" to="/"><FontAwesomeIcon icon="arrow-left" /></Link>
        </div>
        {loading ? <div className="loadingConfig"><span>Carregando...</span></div>
          : (
            <div className="config">
              <h2 data-testid="settings-title">Configurações</h2>
              <form id="form">
                <label htmlFor="categorySelected">
                  <span>Categoria:</span>
                  <select name="categorySelected" onChange={ this.handleInput }>
                    <option value="">Aletório</option>
                    { category
                      .map((c) => <option value={ c.id } key={ c.id }>{c.name}</option>)}
                  </select>
                </label>
                <label htmlFor="difficulty">
                  <span>Dificuldade:</span>
                  <select name="difficulty" onChange={ this.handleInput }>
                    <option value="">Aleatório</option>
                    <option value="hard">Difícil</option>
                    <option value="medium">Médio</option>
                    <option value="easy">Fácil</option>
                  </select>
                </label>
                <label htmlFor="type">
                  <span>Tipo:</span>
                  <select
                    name="type"
                    onChange={ this.handleInput }
                  >
                    <option value="">Aleatório</option>
                    <option value="boolean">Verdade ou Falso</option>
                    <option value="multiple">Multipla escolha</option>
                  </select>
                </label>
              </form>
              {buttonLoading ? <span>Carregando</span>
                : <button type="button" onClick={ this.submitConfig }>Selecionar</button>}
            </div>
          )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleCategory: (payload) => dispatch(changeCategory(payload)),
  handleDifficulty: (payload) => dispatch(changeDifficulty(payload)),
  handleType: (payload) => dispatch(changeType(payload)),
});

export default connect(null, mapDispatchToProps)(Config);

Config.propTypes = {
  handleCategory: PropTypes.func,
  handleDifficulty: PropTypes.func,
  handleType: PropTypes.func,
}.isRequired;
