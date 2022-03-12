import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/index';
import thunk from 'redux-thunk';

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
