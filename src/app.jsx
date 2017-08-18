import React from 'react';
import { render } from 'react-dom';
import MainPage from './main-page';

/**
 * Reference to the application
 */
var app;

export { app };

export function init(customApp) {
	app = customApp;
}

export class App {

	constructor() {
		this.listeners = [];
	}

	/**
	 * Dispatch an action, changing the state of the application
	 * @param {[type]} action The action that generated the state change
	 * @param {[type]} obj  The new state to be merged with the current one
	 */
	dispatch(action, obj) {
		// call listeners
		const lst = this.listeners;
		lst.forEach(listener => {
			listener(action, obj);
		});
	}

	/**
	 * Add a listener that will be notified when application state changes
	 * @param {function} listener A function that will receive app state change notification
	 */
	add(listener) {
		if (this.listeners.indexOf(listener) === -1) {
			this.listeners.push(listener);
		}
	}

	/**
	 * Remove a listener previously added with the add method
	 * @param  {function} listener The listener function previously added
	 */
	remove(listener) {
		var index = this.listeners.indexOf(listener);
		if (index >= 0) {
			this.listeners.splice(index, 1);
		}
	}

	/**
	 * Run the application
	 */
	run() {
		// render the main page
		render(
			<MainPage />,
			document.getElementById('mainDiv'));
	}
}
