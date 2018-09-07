import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import Config from './config/Config';
import GATracker from './utils/GATracker';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

GATracker.create(Config.Keys.GOOGLE_ANALYTICS, {
	log: Config.Env.DEV_MODE,
	simulated: Config.Env.DEV_MODE,
});

ReactDOM.render(
	<App />,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
