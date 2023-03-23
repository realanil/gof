import {Store} from 'redux';
import {configureStore} from './store';
import {GJIStore} from './IStore';

const Gamestore: Store<Partial<GJIStore>> = configureStore();

export {Gamestore};
