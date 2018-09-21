import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [ "displayState" ],
};

const persistedReducers = persistReducer(persistConfig, reducers)

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
	persistedReducers,
	applyMiddleware(sagaMiddleware)
);
export const persistor = persistStore(store);

sagaMiddleware.run(sagas);
