import * as cx from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';

import sessionsActions from '../../actions/sessions.actions';
import Location from '../../data/Location';
import Schedule from '../../data/Schedule';
import Session from "../../data/Session";
import Topic from '../../data/Topic';
import Track from '../../data/Track';
import { ColumnTypes } from "../../reducers/display.reducers";
import SessionBox from "../session-box/SessionBox";
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
	dispatchToggleSessionSelected: (sessionId: string) => void;
}

class ScheduleDay extends React.Component<IProps> {
	private columnConcurrentSessionCache = new Map<string, number>();

	constructor(props: IProps) {
		super(props);
		this.onClickSession = this.onClickSession.bind(this);
	}

	public render() {
		const { date, schedule } = this.props;
		const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
		const weekDays = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
		const title = `${months[date.getMonth()]} ${date.getDate()} (${weekDays[date.getDay()]})`;
		const sessions = schedule ? schedule.sessions.filter((s) => s.date.getTime() === date.getTime()) : [];
		const columns = this.getColumns(sessions);

		return (
			<div className={ styles.main }>
				<div className={ styles.title }>
					{ title }
				</div>
				<div className={ styles.grid }>
					{ this.renderHeader(columns, sessions) }
					{ this.renderSessionRows(columns, sessions) }
				</div>
			</div>
		);
	}

	private renderHeader(columns: IColumnInfo[], sessions: Session[]) {
		return (
			<div className={ cx(styles.row, styles.headerRow) }>
				<div key={ 'column-row-header' } className={ cx(styles.column, styles.headerColumn) }>
					<div className={ styles.cell }>
						{ 'Time' }
					</div>
				</div>
				{ columns.map((column) => this.renderColumnHeader(column, sessions)) }
			</div>
		);
	}

	private renderColumnHeader(column: IColumnInfo, sessions: Session[]) {
		return (
			<div key={ column.id } className={ this.getColumnStyles(column, sessions) }>
				<div className={ styles.cell }>
					{ column.name }
				</div>
			</div>
		);
	}

	private renderSessionRows(columns: IColumnInfo[], sessions: Session[]) {
		// Generates a list of all sessions on all rows first
		// Each row x col position can have more than one session
		const sessionGrid: Session[][][] = [];
		const sessionHeaders: string[] = [];
		const sessionColumnStyles: string[] = [];
		for (let hour = 0; hour < 24; hour++) {
			const sessionRow: Session[][] = [];
			for (const column of columns) {
				const sessionsInColumn = this.getSessionsForColumn(sessions, hour, column.id);
				sessionRow.push(sessionsInColumn);
				sessionColumnStyles.push(this.getColumnStyles(column, sessions));
			}
			sessionGrid.push(sessionRow);
			sessionHeaders.push(`${hour > 12 ? hour - 12 : hour}:00${hour >= 12 ? 'pm' : 'am'}`);
		}

		// Remove empty rows in the beginning and end of the list
		for (let i = 0; i < sessionGrid.length; i++) {
			const hasAnySession = sessionGrid[i].some((sessionCells) => sessionCells.length > 0);
			if (hasAnySession) break;
			sessionGrid.shift();
			sessionHeaders.shift();
			i--;
		}

		for (let i = sessionGrid.length - 1; i >= 0; i--) {
			const hasAnySession = sessionGrid[i].some((sessionCells) => sessionCells.length > 0);
			if (hasAnySession) break;
			sessionGrid.pop();
			sessionHeaders.pop();
		}

		// Finally, render them as JSX elements
		const rows: JSX.Element[] = [];
		sessionGrid.forEach((sessionRow, index) => {
			const rowElements: JSX.Element[] = [];
			sessionRow.forEach((rowSessionCells, columnIndex) => {
				rowElements.push(
					<div key={ `column-${columnIndex}` } className={ sessionColumnStyles[columnIndex] }>
						{ rowSessionCells.map((session) => (
							<SessionBox
								key={ session.id }
								className={ styles.cell }
								session={ session }
								onClick={ this.onClickSession }
							/>
						)) }
					</div>
				);
			});

			rows.push(
				<div key={ `row-${index}` } className={ styles.row }>
					<div key={ 'column-row-header' } className={ styles.column }>
						<div className={ styles.cell }>
							{ sessionHeaders[index] }
						</div>
					</div>
					{ rowElements }
			</div>
			);
		});

		return rows;
	}

	private getSessionsForColumn(allSessions: Session[], hour: number, columnId: string): Session[] {
		const { date } = this.props;
		const startTime = (new Date(date.getTime() + hour * 60 * 60 * 1000)).getTime();
		const endTime = (new Date(date.getTime() + (hour + 1) * 60 * 60 * 1000)).getTime();
		const sessions: Session[] = [];
		for (const session of allSessions) {
			if (this.sessionMatchesColumnId(session, columnId)) {
				const sessionStart = session.startTime.getTime();
				if (sessionStart >= startTime && sessionStart < endTime) {
					sessions.push(session);
				}
			}
		}
		return sessions;
	}

	private getColumnStyles(column: IColumnInfo, sessions: Session[]) {
		let maxConcurrentSessions = 1;
		if (this.columnConcurrentSessionCache.has(column.id)) {
			maxConcurrentSessions = this.columnConcurrentSessionCache.get(column.id) || 0;
		} else {
			const sessionCounts = new Map<string, number>();
			for (const session of sessions) {
				if (this.sessionMatchesColumnId(session, column.id)) {
					const sessionId = session.startTime.toISOString().substr(0, 13);
					const concurrentSessionCount = (sessionCounts.get(sessionId) || 0) + 1;
					sessionCounts.set(sessionId, concurrentSessionCount);
					maxConcurrentSessions = Math.max(maxConcurrentSessions, concurrentSessionCount);
				}
			}
			this.columnConcurrentSessionCache.set(column.id, maxConcurrentSessions);
		}
		const styleNames = [undefined, styles.columnTwo, styles.columnThree, styles.columnFour];
		const styleToUse = styleNames[Math.min(maxConcurrentSessions, styleNames.length - 1) - 1];
		return cx(styles.column, styleToUse);
	}

	private sessionMatchesColumnId(session: Session, columnId: string) {
		const { columnType } = this.props;
		switch (columnType) {
			case ColumnTypes.LOCATION:
				return session.location.id === columnId;
			case ColumnTypes.TOPIC:
				return session.topics.some((t) => t.id === columnId);
			case ColumnTypes.TRACK:
				return session.tracks.some((t) => t.id === columnId);
			default:
				return false;
		}
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

	private onClickSession(session: Session) {
		this.props.dispatchToggleSessionSelected(session.id);
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

const mapDispatchToProps = (dispatch: any) => ({
	dispatchToggleSessionSelected: (sessionId: string) => dispatch(sessionsActions.toggleSessionSelected(sessionId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDay)
