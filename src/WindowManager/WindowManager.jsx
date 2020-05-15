import React from 'react';

// import { Plugins, ActivePlugins, EnablePlugin } from './Plugins';

import WidgetLayer from './Widgets';
import AppLayer from './Apps';

import './styles.css';


export default class WindowManager extends React.Component {
	// constructor() {
	// this.ActivePlugins = ActivePlugins;
	// this.EnablePlugin = EnablePlugin;
	// }

	open(app) {
		this.ActivePlugins.push(this.Plugins.app[app]);
	}

	render() {
		return (
			<>
				<WidgetLayer />
				<AppLayer />
			</>
		);
	}
}
