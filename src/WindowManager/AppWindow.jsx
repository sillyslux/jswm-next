/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
// import { ActivePlugins, EvtListener } from './Plugins';

let raf;
let newX;
let newY;
let offsetX;
let offsetY;

export default class WindowApp extends React.Component {
	static dragMove({ clientX, clientY }) {
		newX = clientX;
		newY = clientY;
	}

	constructor() {
		super();
		this.dragMove = this.constructor.dragMove.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
		this.rafMove = this.rafMove.bind(this);
	}

	dragStart({ clientX, clientY }) {
		const { offsetLeft, offsetTop } = this.win;
		newX = clientX;
		newY = clientY;
		offsetX = clientX - offsetLeft;
		offsetY = clientY - offsetTop;
		raf = window.requestAnimationFrame(this.rafMove);
		document.addEventListener('mousemove', this.dragMove);
		document.addEventListener('mouseup', this.dragEnd);
		document.body.classList.add('moving');
	}

	dragEnd() {
		document.removeEventListener('mousemove', this.dragMove);
		document.removeEventListener('mouseup', this.dragEnd);
		window.cancelAnimationFrame(raf);
		document.body.classList.remove('moving');
	}

	rafMove() {
		const el = this.win;
		el.style.top = `${newY - offsetY}px`;
		el.style.left = `${newX - offsetX}px`;
		raf = window.requestAnimationFrame(this.rafMove);
	}

	close() {
		// const target = ActivePlugins.findIndex((app) => app === this.props.App);
		// ActivePlugins.pop();
		// EvtListener.forEach((f) => f());
	}
	// https://filipmolcik.com/react-children-vanilla-html-element/

	render() {
		const { props: { App } } = this;
		return (
			<div ref={(c) => { this.win = c; }} className="appWindow" style={{ ...App.size, left: 0, top: 0 }}>
				<div onMouseDown={this.dragStart.bind(this)} className="appWindowTitlebar">
					{App.name}
					<span className="closeButton" onClick={() => this.close()} style={{ float: 'right' }}>
						x
					</span>
				</div>
				<div className="appWindowContent">
					<div className="cover" />
					<App />
				</div>
			</div>
		);
	}
}
