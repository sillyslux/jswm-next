import React from 'react';
import { createUseStyles } from 'react-jss';
import { shallowEqual, useSelector } from 'react-redux';


const useStyles = createUseStyles({
	widgetLayer: {
		position: 'absolute',
		// top: 0,
		// left: 0,
		// width: '100%',
		// height: '100%',
	},
});


export default () => {
	const { widgetLayer } = useStyles();
	const widgets = useSelector(({ plugins: { running } }) => running.filter(
		(plugin) => plugin.type === 'widget',
	), shallowEqual);

	console.log('render WidgetLayer', widgets.length);

	return (
		<div className={widgetLayer}>
			{ widgets.map((Plugin) => <Plugin key={Plugin.xoId} />)}
		</div>
	);
};
