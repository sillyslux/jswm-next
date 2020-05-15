import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { registerPlugin } from 'wm/actions/plugins';
import { store } from '../WindowManager';

const useStyles = createUseStyles({
	wallDate: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
});


store.dispatch(registerPlugin(
	// eslint-disable-next-line prefer-arrow-callback
	function WallDate () {
		const { wallDate } = useStyles();

		const [date, setDate] = useState("date");

		let loopId;

		function loop() {
			const now = new Date();
			if (now.getSeconds() === 0) return;
			setDate(now.toDateString()+' '+now.getSeconds());
			// loopId = setTimeout(loop, 10e3);
		}
		setTimeout(loop, 3e3);
		
		useEffect(() => {
			return function cleanup() {
				clearTimeout(loopId);
			};
		});

		return (
			<div className={wallDate}>
				<span className="m">{date}</span>
			</div>
		);
	}, {
		type: 'widget',
		xoId: 'WallDate',
		xoName: 'WallDate',
		autostart: true,
	},
));
