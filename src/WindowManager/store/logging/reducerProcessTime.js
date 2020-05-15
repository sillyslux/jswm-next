const round = (number) => Math.round(number * 100) / 100;

const monitorReducerEnhancer = (createStore) => (
	reducer,
	initialState,
	enhancer,
) => {
	const monitoredReducer = (state, action) => {
		// console.log(process.env.NODE_ENV)
		const start = performance.now();
		const newState = reducer(state, action);
		const end = performance.now();
		const diff = round(end - start);

		// eslint-disable-next-line no-console
		console.log('reducer process time:', diff);

		return newState;
	};

	return createStore(monitoredReducer, initialState, enhancer);
};

export default monitorReducerEnhancer;
