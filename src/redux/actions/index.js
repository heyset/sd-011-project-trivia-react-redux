export const changeEmail = (payload) => ({
  type: 'CHANGE_EMAIL',
  payload,

});

export const changeName = (payload) => ({
  type: 'CHANGE_NAME',
  payload,
});

export const changeToken = (payload) => ({
  type: 'CHANGE_TOKEN',
  payload,
});

export const changeScore = (payload) => ({
  type: 'CHANGE_SCORE',
  payload,
});

export const changeAssertions = (payload) => ({
  type: 'CHANGE_ASSERTIONS',
  payload,
});

export const changeQuestions = (payload) => ({
  type: 'CHANGE_QUESTIONS',
  payload,
});

export const clearPlayer = () => ({
  type: 'CLEAR_PLAYER',
});

export const changeCategory = (payload) => ({
  type: 'CHANGE_CATEGORY',
  payload,
});

export const changeType = (payload) => ({
  type: 'CHANGE_TYPE',
  payload,
});

export const changeDifficulty = (payload) => ({
  type: 'CHANGE_DIFFICULTY',
  payload,
});

const BASE_URL = 'https://opentdb.com';
export const getToken = () => (dispatch) => fetch(`${BASE_URL}/api_token.php?command=request`)
  .then((result) => result.json())
  .then((data) => dispatch(changeToken(data.token)));

export const getQuestions = ({ token, difficulty, category, type }) => {
  const difficultyParam = difficulty ? `&difficulty=${difficulty}` : '';
  const categoryParam = category ? `&category=${category}` : '';
  const typeParam = type ? `&type=${type}` : '';
  const tokenParam = `&token=${token}`;
  const params = difficultyParam + tokenParam + categoryParam + typeParam;
  return (dispatch) => fetch(`${BASE_URL}/api.php?amount=5${params}`)
    .then((result) => result.json())
    .then((data) => dispatch(changeQuestions(data.results)));
};
