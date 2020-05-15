import React from 'react';
import injectSheet, { createUseStyles } from 'react-jss';
import { registerPlugin } from 'wm/actions/plugins';
import { store } from '../WindowManager';
import './styles.css';

const useStyles = {
	wallClock: {
		bottom: 50,
		color: '#FEFEFE',
		position: 'fixed',
		left: 30,
		cursor: 'default',
		display: 'inline-block',
		opacity: 0.7,
		userSselect: 'none',
		'& .h': {
			color: '#fefefe',
		},
	},
};


store.dispatch(registerPlugin(class WallClock extends React.Component {
	static type = 'widget';

	static xoId = 'WallClock';
	
	static xoName = 'WallClock';

	static autostart = true;

	constructor(props) {
		super(props);
		// debugger
		this.state = { time: [] };
	}

	componentDidMount() {
		const func = () => {
			const now = new Date();
			this.setState({ time: [now.getHours(), now.getMinutes()] });
			this.loopId = setTimeout(func, 1e3);
		};
		func();
	}

	componentWillUnmount() {
		clearTimeout(this.loopId);
	}

	render() {
		const { time: [h, m] } = this.state;
		// const { wallClock } = useStyles();

		return (
			<div className="wallClock">
				<span key="h" className="h">{`${h}`.padStart(2, 0)}</span>
				<span key="m" className="m">{`${m}`.padStart(2, 0)}</span>
			</div>
		);
	}
}));
