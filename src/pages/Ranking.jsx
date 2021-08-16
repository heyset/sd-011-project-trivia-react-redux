import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ranking.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/common/Layout';

library.add(fas);

export default class Ranking extends Component {
  getRankingFromStorage() {
    let ranking = [];

    try {
      ranking = JSON.parse(localStorage.getItem('ranking'));
      if (!ranking) ranking = [];
    } catch (err) {
      console.error(err);
    }

    return ranking;
  }

  render() {
    const ranking = this.getRankingFromStorage();

    return (
      <Layout title="Ranking">
        <main className="ranking">
          <header>
            <h1 data-testid="ranking-title"> &#127942; Ranking &#127942;</h1>
          </header>
          <div className="xablau">
            <Link className="btnRankingBack" data-testid="btn-go-home" to="/">
              <FontAwesomeIcon icon="home" />
            </Link>
          </div>
          <ol>
            { ranking.map(({ name, picture, score }, index) => (
              <li key={ `${name}-index` }>
                <img src={ picture } alt={ `Avatar de ${name}` } />
                <p data-testid={ `player-name-${index}` }>{ name }</p>
                <p data-testid={ `player-score-${index}` }>{ score }</p>
              </li>
            )) }
          </ol>
        </main>
      </Layout>
    );
  }
}
