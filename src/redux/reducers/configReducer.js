const INITIAL_STATE = {
  category: '',
  type: '',
  difficulty: '',
};
const configReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case 'CHANGE_CATEGORY':
    return {
      ...state,
      category: payload,
    };
  case 'CHANGE_TYPE':
    return {
      ...state,
      type: payload,
    };
  case 'CHANGE_DIFFICULTY':
    return {
      ...state,
      difficulty: payload,
    };

  default:
    return state;
  }
};

export default configReducer;
