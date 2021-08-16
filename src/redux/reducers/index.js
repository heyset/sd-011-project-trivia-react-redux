import { combineReducers } from 'redux';
import user from './userReducer';
import questions from './questionsReducer';
import config from './configReducer';

const rootReducer = combineReducers({ user, questions, config });

export default rootReducer;
