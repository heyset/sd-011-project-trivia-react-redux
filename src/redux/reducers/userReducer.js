const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  token: '',
  score: 0,
  assertions: 0,
};

const userReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case 'CHANGE_EMAIL':
    return {
      ...state,
      gravatarEmail: payload,
    };
  case 'CHANGE_NAME':
    return {
      ...state,
      name: payload,
    };
  case 'CHANGE_TOKEN':
    localStorage.setItem('token', payload);
    return {
      ...state,
      token: payload,
    };
  case 'CHANGE_SCORE':
    return {
      ...state,
      score: state.score + payload,
    };
  case 'CHANGE_ASSERTIONS':
    return {
      ...state,
      assertions: payload,
    };
  case 'CLEAR_PLAYER':
    return {
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
};

export default userReducer;
