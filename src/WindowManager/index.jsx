import React from 'react';

import { Provider } from 'react-redux';
import configureStore from './store';

import WindowManager from './WindowManager';

export const store = configureStore();

function App() {
	return (
		<Provider store={store}>
			<WindowManager />
		</Provider>
	);
}

export default App;
