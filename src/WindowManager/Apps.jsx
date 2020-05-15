/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { createUseStyles } from 'react-jss';
import { shallowEqual, useSelector } from 'react-redux';
import WindowApp from './AppWindow';


const useStyles = createUseStyles({
	appLayer: {
		position: 'absolute',
		// top: 0,
		// left: 0,
		// width: '100%',
		// height: '100%',
	},
});


export default () => {
	const { appLayer } = useStyles();
	const apps = useSelector(({ plugins: { running } }) => running.filter(
		(plugin) => plugin.type === 'app',
	), shallowEqual);

	console.log('render Application Layer', apps.length);

	return (
		<div className={appLayer}>
			{ apps.map((App, index) => <WindowApp key={App.xoId + index} App={App} />) }
		</div>
	);
};
