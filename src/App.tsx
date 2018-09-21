import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

import Root from './pages/Root';
import { persistor, store } from './store';

export default class App extends React.Component {
	public render() {
		return (
			<Provider store={ store }>
				<PersistGate loading={ null } persistor={ persistor }>
					<Router>
						<Route
							path={ "/" }
							component={ Root }
						/>
					</Router>
				</PersistGate>
			</Provider>
		);
	}
}
