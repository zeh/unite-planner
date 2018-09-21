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
	constructor(props: IProps) {
		super(props);
		this.printPage = this.printPage.bind(this);
	}

	public render() {
		return (
			<div className={styles.main}>
				<div className={styles.header}>
					<h1>Unite Planner</h1>
				</div>
				<div className={styles.content}>
					<h2>Home</h2>
					<p>Welcome. This is a simple website to help you plan <a href="https://unite.unity.com/2018/los-angeles" target="_blank">Unite Los Angeles 2018</a> sessions to attend.</p>
					<p>
						While the conference's website already features a schedule, planning your time around it is somewhat difficult since they're displayed sequentially, rather than as a time sheet.
						With many presentations happening in parallel, it's hard to decide which one to attend. My aim with this website was to make that kind of decision easier.
					</p>
					<p>
						To toggle whether a session is selected or not, just click the session. This selection action is merely visual and has no other effect. Selected sessions are remembered the next time you visit the website. Other display options are also remembered.
					</p>
					<p>
						All conferences are loaded from Unite's website and listed below. They can be organized by track, topic, or location.
						You can also <a href="#" onClick={this.printPage}>print the spreadsheet</a> once you're happy with your selection.
					</p>
					<p>Finally, the source code for this page <a href="https://github.com/zeh/unite-planner" target="_blank">is available on GitHub</a>. In the future, this application will be updated to support upcoming Unite conferences. In the meantime, feel free to suggest features, or provide bug reports.</p>
					<p><small>This website comes with no guarantees. The website and its author are not associated with Unite or Unity Technologies in any way. Unity is a trademark of Unity Technologies.</small></p>
					<h3>Options</h3>
					<DisplayOptions/>
				</div>
				<div className={styles.content}>
					{ this.renderData() }
				</div>
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
			<div className={ styles.schedules }>
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

	private printPage() {
		window.print();
	}
}

const mapStateToProps = (state: IStore) => ({
	schedule: state.scheduleState.schedule,
	isLoading: state.scheduleState.isLoading,
	isLoaded: state.scheduleState.isLoaded,
	errorMessage: state.scheduleState.errorMessage,
});

export default connect(mapStateToProps)(Home)
