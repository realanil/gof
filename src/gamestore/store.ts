import {applyMiddleware, createStore, Store} from 'redux';
import {sagaMiddleware} from './middleware';
import {GJIStore} from './IStore';
import gamerootReducer from '../gamereducer';
import rootSaga from '../gamesaga';

export const configureStore = (initialState?: GJIStore): Store<Partial<GJIStore>> => {
    const store = createStore(gamerootReducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
};

