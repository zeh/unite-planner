import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router-dom';

import scheduleActions from './../actions/schedule.actions';
import GATracker from './../utils/GATracker';
import Home from './home/Home';

import * as styles from './Root.css';

// Temporarily use a hardcoded URL for Unite LA
const DATA_URL = 'https://event-feed-data.s3.amazonaws.com/UID-EVNT-KbsqrAQwkDW3Oov1JKz1oBt-Lotq2vPTFrt7S9Jj9wxe.json';

interface ILocation {
	pathname: string;
	query: any;
	match: any;
}

interface IProps {
	location?: ILocation;
	dispatchSetUrl: (url: string) => void;
}

class Root extends React.Component<IProps> {
	public componentDidMount() {
		this.props.dispatchSetUrl(DATA_URL);
		this.checkLocation();
	}

	public componentDidUpdate(prevProps: IProps & RouteComponentProps<any>) {
		this.checkLocation(prevProps);
	}

	public render() {
		return (
			<div className={styles.main}>
				<Route exact path="/" component={Home} />
			</div>
		);
	}

	private checkLocation(prevProps?: IProps & RouteComponentProps<any>) {
		if (this.props.location) {
			// Scroll to top on new pages
			if (prevProps && this.props.location.pathname !== prevProps.location.pathname) {
				window.scrollTo(0, 0);
			}
			// Track first page, or any other page change
			if (!prevProps || this.props.location.pathname !== prevProps.location.pathname) {
				if (this.props.location) {
					GATracker.getInstance().trackPage(this.props.location.pathname);
				}
			}
		}
	}
}

const mapDispatchToProps = (dispatch: any) => ({
	dispatchSetUrl: (url: string) => dispatch(scheduleActions.setUrl(url)),
});

export default connect(null, mapDispatchToProps)(Root)
