const INITIAL_STATE = {
  questions: [],
};

function decodeHTML(string) {
  const doc = new DOMParser().parseFromString(string, 'text/html');
  return doc.documentElement.textContent;
}

const questionsReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case 'CHANGE_QUESTIONS':
    return {
      ...state,
      questions: payload.map((data) => ({
        ...data, question: decodeHTML(data.question),
      })),
    };

  default:
    return state;
  }
};

export default questionsReducer;
