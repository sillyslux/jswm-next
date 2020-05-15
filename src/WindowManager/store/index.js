import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { createLogger } from 'redux-logger';
import reducerProcessTime from './logging/reducerProcessTime';
import rootReducer from './reducers';

const reduxLogger = createLogger({
	collapsed: true,
	duration: true,
});

const middlewares = [
	process.env.NODE_ENV === 'development' && reduxLogger,
].filter(Boolean);
const enhancers = [
	process.env.NODE_ENV === 'development' && reducerProcessTime,
].filter(Boolean);

export default function configureAppStore(preloadedState) {
	const store = configureStore({
		reducer: rootReducer,
		middleware: [...middlewares, ...getDefaultMiddleware({ serializableCheck: false })],
		preloadedState,
		enhancers,
	});

	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
	}

	return store;
}
