import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { registerPlugin } from 'wm/actions/plugins';
import { shallowEqual, useSelector } from 'react-redux';
import { store } from '../WindowManager';


const useStyles = createUseStyles({
	taskbar: {
		color: 'lightslategray',
		position: 'fixed',
		bottom: 0,
		background: '#f3f3f3',
		width: '100%',
		padding: '2px 4px',
		boxSizing: 'border-box',
		borderTop: '1px solid rgba(0, 0, 0, .1)',
		'& .time': {
			float: 'right',
			background: '#fefefe',
			padding: [2, 4],
		},
	},
});


store.dispatch(registerPlugin(
	// eslint-disable-next-line prefer-arrow-callback
	function DefaultTaskbar (options) {
		const { taskbar } = useStyles();

		const time = new Date();
		const [[h, m], setTime] = useState([time.getHours(), time.getMinutes()]);

		let loopId;

		function loop() {
			const now = new Date();
			if (now.getSeconds() !== 0) {
				loopId = setTimeout(loop, 1e3);
				return;
			}
			setTime([now.getHours(), now.getMinutes()]);
		}
		setTimeout(loop, 1e3);

		const apps = useSelector(({ plugins: { installed } }) => installed.filter(
			(plugin) => plugin.type === 'app',
		), shallowEqual);
		useEffect(() => {
			return function cleanup() {
				clearTimeout(loopId);
			};
		});

		const Launcher = apps.find(({ type }) => type === 'launcher') || (() => null);
		return (
			<div className={taskbar}>
				test
				<Launcher style={{ float: 'left' }} />
				<div className="time" onClick={() => { debugger; }}>
					<span key="h" className="h">{`${h}`.padStart(2, 0)}</span>
					:
					<span key="m" className="m">{`${m}`.padStart(2, 0)}</span>
				</div>
			</div>
		);
	}, {
		type: 'widget',
		xoId: 'DefaultTaskbar',
		xoName: 'Default Taskbar',
		autostart: true,
		size: 'small',
	},
));
