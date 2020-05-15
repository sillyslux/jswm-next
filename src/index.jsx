import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';

import App from './WindowManager';

import './WallClock/WallClock';
import './WallClock/WallDate';
import './apps/DefaultTaskbar';

const HMRApp = hot(App);

render(
	<HMRApp />,
	document.getElementById('desktop'),
);
