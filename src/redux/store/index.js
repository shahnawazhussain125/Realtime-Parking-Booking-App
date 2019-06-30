import {createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { loadState, saveState} from './localStore';

const persistedStore = loadState();

const store = createStore(rootReducer, persistedStore , applyMiddleware(thunk, logger));

store.subscribe(()=>{
    saveState(store.getState());
})

export default store;


