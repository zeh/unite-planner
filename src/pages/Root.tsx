import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import scheduleActions from './../actions/schedule.actions';
import Home from './home/Home';

import * as styles from './Root.css';

// Temporarily use a hardcoded URL for Unite LA
const DATA_URL = 'https://event-feed-data.s3.amazonaws.com/UID-EVNT-KbsqrAQwkDW3Oov1JKz1oBt-Lotq2vPTFrt7S9Jj9wxe.json';

interface IProps {
	dispatchSetUrl: (url: string) => void;
}

class Root extends React.Component<IProps> {
	public componentDidMount() {
		this.props.dispatchSetUrl(DATA_URL);
	}

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

const mapDispatchToProps = (dispatch: any) => ({
	dispatchSetUrl: (url: string) => dispatch(scheduleActions.setUrl(url)),
});

export default connect(null, mapDispatchToProps)(Root)
