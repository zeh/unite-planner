import * as React from 'react';
import { connect } from 'react-redux';

import Schedule from '../../data/Schedule';
import { ColumnTypes } from "../../reducers/display.reducers";
import { IStore } from './../../models';

import * as styles from './ScheduleDay.css';

interface IProps {
	schedule?: Schedule;
	date: Date;
	showDescription: boolean;
	showLocation: boolean;
	showTopics: boolean;
	showTracks: boolean;
	showSpeakers: boolean;
	columnType: ColumnTypes;
}

class ScheduleDay extends React.Component<IProps> {
	public render() {
		const { date } = this.props;
		const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
		const weekDays = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
		const title = `${months[date.getMonth()]} ${date.getDate()} (${weekDays[date.getDay()]})`;

		return (
			<div className={ styles.main }>
				<div className={ styles.title }>
					{ title }
				</div>
			</div>
		);
	}


}

const mapStateToProps = (state: IStore) => ({
	showDescription: state.displayState.showDescription,
	showLocation: state.displayState.showLocation,
	showTopics: state.displayState.showTopics,
	showTracks: state.displayState.showTracks,
	showSpeakers: state.displayState.showSpeakers,
	columnType: state.displayState.columnType,
});

export default connect(mapStateToProps)(ScheduleDay)
