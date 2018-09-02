import * as React from 'react';
import { connect } from 'react-redux';

import DisplayOptions from '../../components/display-options/DisplayOptions';
import ScheduleDay from '../../components/schedule-day/ScheduleDay';
import Schedule from '../../data/Schedule';
import { IStore } from './../../models';

import * as styles from './Home.css';

interface IProps {
	schedule?: Schedule;
	isLoading: boolean;
	isLoaded: boolean;
	errorMessage?: string;
}

class Home extends React.Component<IProps> {
	public render() {
		return (
			<div className={styles.main}>
				<div>
					<h2>Home</h2>
					<p>
						{ 'Welcome. This is a website to help you plan Unite sessions to attend.' }
					</p>
					<h3>Options</h3>
					<DisplayOptions/>
				</div>
				{ this.renderData() }
			</div>
		);
	}

	private renderData() {
		const {
			isLoaded,
			isLoading,
			errorMessage,
			schedule,
		} = this.props;

		if (isLoaded && schedule) {
			return this.renderDates(schedule);
		} else if (isLoading) {
			return this.renderLoading();
		} else if (errorMessage) {
			return this.renderError(errorMessage);
		}

		return null;
	}

	private renderDates(schedule: Schedule) {
		const dates = [];
		const tempDate = new Date(schedule.startDate);
		while (tempDate.getTime() <= schedule.endDate.getTime()) {
			dates.push(new Date(tempDate));
			tempDate.setDate(tempDate.getDate() + 1);
		}

		return (
			<div>
				{ dates.map((date) => this.renderDate(date, schedule)) }
			</div>
		)
	}

	private renderDate(date: Date, schedule: Schedule) {
		return (
			<ScheduleDay
				key={date.getTime()}
				date={ date }
				schedule= { schedule }
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
	schedule: state.scheduleState.schedule,
	isLoading: state.scheduleState.isLoading,
	isLoaded: state.scheduleState.isLoaded,
	errorMessage: state.scheduleState.errorMessage,
});

export default connect(mapStateToProps)(Home)
