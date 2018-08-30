import * as React from 'react';
import { connect } from 'react-redux';

import ScheduleDay from '../../components/schedule-day/ScheduleDay';
import { IStore } from './../../models';

import * as styles from './Home.css';

interface IProps {
	data?: object;
	isLoading: boolean;
	isLoaded: boolean;
	errorMessage?: string;
}

class Home extends React.Component<IProps> {
	public render() {
		return (
			<div className={styles.main}>
				<h2>Home</h2>
				{ this.renderData() }
			</div>
		);
	}

	private renderData() {
		const {
			isLoaded,
			isLoading,
			errorMessage,
			data,
		} = this.props;

		if (isLoaded && data) {
			return this.renderDates(data);
		} else if (isLoading) {
			return this.renderLoading();
		} else if (errorMessage) {
			return this.renderError(errorMessage);
		}

		return null;
	}

	private renderDates(data: any) {
		const dateBegin = new Date(`${data.event.dateBegin}T00:00:00`);
		const dateEnd = new Date(`${data.event.dateEnd}T00:00:00`);
		const dates = [];
		const tempDate = new Date(dateBegin);
		while (tempDate.getTime() <= dateEnd.getTime()) {
			dates.push(new Date(tempDate));
			tempDate.setDate(tempDate.getDate() + 1);
		}

		return (
			<div>
				{ dates.map((date) => this.renderDate(date, data)) }
			</div>
		)
	}

	private renderDate(date: Date, data: object) {
		return (
			<ScheduleDay
				key={date.getTime()}
				date={ date }
				data= { data }
			/>
		)
	}

	private renderLoading() {
		return (
			<div>
				Loading...
			</div>
		);
	}

	private renderError(message: string) {
		return (
			<div>
				{ 'Error loading: ' + message }
			</div>
		);
	}
}

const mapStateToProps = (state: IStore) => ({
	data: state.scheduleState.data,
	isLoading: state.scheduleState.isLoading,
	isLoaded: state.scheduleState.isLoaded,
	errorMessage: state.scheduleState.errorMessage,
});

export default connect(mapStateToProps)(Home)
