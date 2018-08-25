import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/home/Home';

import './App.css';

export default class App extends React.Component {
	public render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Home} />
				</div>
			</Router>
		);
	}
}
