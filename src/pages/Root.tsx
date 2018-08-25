import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './home/Home';

import * as styles from './Root.css';

export default class Root extends React.Component {
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
