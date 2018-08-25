import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/home/Home';

import * as styles from './App.css';

export default class App extends React.Component {
	public render() {
		return (
			<Router>
				<div className={styles.main}>
					<Route exact path="/" component={Home} />
				</div>
			</Router>
		);
	}
}
