import * as React from 'react';
import { Provider } from 'react-redux';

import Root from './pages/Root';
import store from './store';

export default class App extends React.Component {
	public render() {
		return (
			<Provider store={store}>
				<Root/>
			</Provider>
		);
	}
}
