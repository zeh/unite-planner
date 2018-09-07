import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Root from './pages/Root';
import store from './store';

export default class App extends React.Component {
	public render() {
		return (
			<Provider store={store}>
				<Router>
					<Route
						path={ "/" }
						component={ Root }
					/>
				</Router>
			</Provider>
		);
	}
}
