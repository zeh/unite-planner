import * as cx from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';

import Location from '../../data/Location';
import Schedule from '../../data/Schedule';
import Session from "../../data/Session";
import Topic from '../../data/Topic';
import Track from '../../data/Track';
import { ColumnTypes } from "../../reducers/display.reducers";
import { IStore } from './../../models';

import * as styles from './ScheduleDay.css';

interface IColumnInfo {
	name: string;
	id: string;
}

interface IProps {
	schedule?: Schedule;
	date: Date;
	showDescription: boolean;
	showLocation: boolean;
	showTopics: boolean;
	showTracks: boolean;
	showSpeakers: boolean;
	showFormat: boolean;
	showAudience: boolean;
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
				<div className={ styles.sessions }>
					{ this.renderHeader() }
					{ this.renderSessionRows() }
				</div>
			</div>
		);
	}

	private renderHeader() {
		const { date, schedule } = this.props;
		const sessions = schedule ? schedule.sessions.filter((s) => s.date.getTime() === date.getTime()) : [];
		const columns = this.getColumns(sessions);

		return (
			<div className={ cx(styles.row, styles.header) }>
				<div key={ 'row-header' } className={ styles.column }>
					<div className={ styles.cell }>
						{ 'Times' }
					</div>
				</div>
				{ columns.map((column) => this.renderColumnHeader(column)) }
			</div>
		);
	}

	private renderSessionRows() {
		return null;
	}

	private renderColumnHeader(column: IColumnInfo) {
		return (
			<div key={ column.id } className={ styles.column }>
				<div className={ styles.cell }>
					{ column.name }
				</div>
			</div>
		);
	}

	private getColumns(sessions: Session[]): IColumnInfo[] {
		const { columnType } = this.props;
		switch (columnType) {
			case ColumnTypes.LOCATION:
				return this.getLocationsFromSessions(sessions);
			case ColumnTypes.TOPIC:
				return this.getTopicsFromSessions(sessions);
			case ColumnTypes.TRACK:
				return this.getTracksFromSessions(sessions);
			default:
				return [];
		}
	}

	private getLocationsFromSessions(sessions: Session[]): Location[] {
		return sessions.reduce((locations: Location[], session) => {
			if (!locations.find((l) => l === session.location)) {
				locations.push(session.location);
			}
			return locations;
		}, []).sort(this.sortColumnTitles);
	}

	private getTopicsFromSessions(sessions: Session[]): Topic[] {
		return sessions.reduce((topics: Topic[], session) => {
			session.topics.forEach((topic) => {
				if (!topics.find((t) => t === topic)) {
					topics.push(topic);
				}
			});
			return topics;
		}, []).sort(this.sortColumnTitles);
	}

	private getTracksFromSessions(sessions: Session[]): Track[] {
		return sessions.reduce((tracks: Track[], session) => {
			session.tracks.forEach((track) => {
				if (!tracks.find((t) => t === track)) {
					tracks.push(track);
				}
			});
			return tracks;
		}, []).sort(this.sortColumnTitles);
	}

	private sortColumnTitles(a: IColumnInfo, b: IColumnInfo): number {
		const na = a.name.toLowerCase();
		const nb = b.name.toLowerCase();
		if (na < nb) return -1;
		if (na > nb) return 1;
		return 0;
	}
}

const mapStateToProps = (state: IStore) => ({
	showDescription: state.displayState.showDescription,
	showLocation: state.displayState.showLocation,
	showTopics: state.displayState.showTopics,
	showTracks: state.displayState.showTracks,
	showSpeakers: state.displayState.showSpeakers,
	showFormat: state.displayState.showFormat,
	showAudience: state.displayState.showAudience,
	columnType: state.displayState.columnType,
});

export default connect(mapStateToProps)(ScheduleDay)
