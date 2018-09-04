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
	showDescription: boolean;
	showLocation: boolean;
	showTopics: boolean;
	showTracks: boolean;
	showSpeakers: boolean;
	showFormat: boolean;
	showAudience: boolean;
	columnType: ColumnTypes;
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
		} = this.props;

		return (
			<div className={ cx(className, styles.main) } onClick={ this.onClick }>
				<div>
					{ session.title }
				</div>
				{ showLocation && columnType !== ColumnTypes.LOCATION &&
					<div>
						{ `(${session.location.name})` }
					</div>
				}
				{ showDescription &&
					<div>
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
					<div>
						{ session.topics.map((topic) => (
							<div key={ topic.id }>{ topic.name }</div>
						)) }
					</div>
				}
				{ showSpeakers &&
					<div>
						{ session.speakers.map((speaker) => (
							<div key={ speaker.id }>{ `${speaker.firstName} ${speaker.lastName}, ${speaker.company}` }</div>
						)) }
					</div>
				}
				{ showFormat &&
					<div>
						{ `${session.format.name} (${session.format.duration}min)` }
					</div>
				}
				{ showAudience &&
					<div>
						{ session.audience.name }
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

export default connect(mapStateToProps)(SessionBox)
