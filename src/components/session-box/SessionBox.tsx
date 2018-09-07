import * as cx from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';

import Session from "../../data/Session";
import { IStore } from '../../models';
import { ColumnTypes } from "../../reducers/display.reducers";

import * as styles from './SessionBox.css';

interface IProps {
	className?: string;
	session: Session;
	onClick?: (session: Session) => void;
	showDescription?: boolean;
	showLocation?: boolean;
	showTopics?: boolean;
	showTracks?: boolean;
	showSpeakers?: boolean;
	showFormat?: boolean;
	showAudience?: boolean;
	columnType?: ColumnTypes;
	isSelected?: boolean;
}

class SessionBox extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	public render() {
		const {
			className,
			session,
			columnType,
			showDescription,
			showLocation,
			showTopics,
			showTracks,
			showSpeakers,
			showFormat,
			showAudience,
			isSelected,
		} = this.props;

		return (
			<div className={ cx(className, styles.main, isSelected ? styles.selected : undefined) } onClick={ this.onClick }>
				<div className={ styles.infoTitle }>
					{ session.title }
				</div>
				{ showLocation && columnType !== ColumnTypes.LOCATION &&
					<div className={ styles.infoLocation }>
						{ `(${session.location.name})` }
					</div>
				}
				{ showDescription &&
					<div className={ styles.infoDescription }>
						{ session.description.map((paragraph) => (
							<p key={ paragraph }>{ paragraph }</p>
						)) }
					</div>
				}
				{ showTopics && columnType !== ColumnTypes.TOPIC &&
					<div className={ styles.infoTopics }>
						{ session.topics.map((topic) => (
							<div key={ topic.id }>{ topic.name }</div>
						)) }
					</div>
				}
				{ showTracks && columnType !== ColumnTypes.TRACK &&
					<div className={ styles.infoTrack }>
						{ session.tracks.map((track) => (
							<div key={ track.id }>{ `🚆 ${track.name}` }</div>
						)) }
					</div>
				}
				{ showFormat && session.format && session.format.name &&
					<div className={ styles.infoFormat }>
						{ `👨‍🏫️ ${session.format.name}` }
					</div>
				}
				{ showAudience &&
					<div className={ styles.infoAudience }>
						{ `🎓 Audience: ${session.audience.name}` }
					</div>
				}
				{ showSpeakers &&
					<div className={ styles.infoSpeakers }>
						{ session.speakers.map((speaker) => (
							<p key={ speaker.id }>{ `👤 ${speaker.firstName} ${speaker.lastName}${speaker.company ? `, ${speaker.company}` : ''}` }</p>
						)) }
					</div>
				}
			</div>
		);
	}

	private onClick() {
		const {
			onClick,
			session,
		} = this.props;
		if (onClick) onClick(session);
	}
}

const mapStateToProps = (state: IStore, props: IProps) => ({
	showDescription: state.displayState.showDescription,
	showLocation: state.displayState.showLocation,
	showTopics: state.displayState.showTopics,
	showTracks: state.displayState.showTracks,
	showSpeakers: state.displayState.showSpeakers,
	showFormat: state.displayState.showFormat,
	showAudience: state.displayState.showAudience,
	columnType: state.displayState.columnType,
	isSelected: state.scheduleState.selectedSessions.indexOf(props.session.id) > -1
});

export default connect(mapStateToProps)(SessionBox)
