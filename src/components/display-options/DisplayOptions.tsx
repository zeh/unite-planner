import * as React from 'react';
import { connect } from 'react-redux';

import displayActions from '../../actions/display.actions';
import { ColumnTypes } from "../../reducers/display.reducers";
import CheckBox from '../form/check-box/CheckBox';
import DropDown from '../form/drop-down/DropDown';
import { IStore } from './../../models';

import * as styles from './DisplayOptions.css';

interface IProps {
	showDescription: boolean;
	showLocation: boolean;
	showTopics: boolean;
	showTracks: boolean;
	showSpeakers: boolean;
	showFormat: boolean;
	showAudience: boolean;
	columnType: ColumnTypes;
	dispatchSetShowDescription: (show: boolean) => void;
	dispatchSetShowLocation: (show: boolean) => void;
	dispatchSetShowTopics: (show: boolean) => void;
	dispatchSetShowTracks: (show: boolean) => void;
	dispatchSetShowSpeakers: (show: boolean) => void;
	dispatchSetShowFormat: (show: boolean) => void;
	dispatchSetShowAudience: (show: boolean) => void;
	dispatchSetUseLocalTimezone: (use: boolean) => void;
	dispatchSetColumnType: (columnType: ColumnTypes) => void;
}

class DisplayOptions extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		this.onChangeColumnType = this.onChangeColumnType.bind(this);
		this.onChangeShowDescription = this.onChangeShowDescription.bind(this);
		this.onChangeShowLocation = this.onChangeShowLocation.bind(this);
		this.onChangeShowTopics = this.onChangeShowTopics.bind(this);
		this.onChangeShowTracks = this.onChangeShowTracks.bind(this);
		this.onChangeShowSpeakers = this.onChangeShowSpeakers.bind(this);
		this.onChangeShowFormat = this.onChangeShowFormat.bind(this);
		this.onChangeShowAudience = this.onChangeShowAudience.bind(this);
	}

	public render() {
		const {
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
			<div className={ styles.main }>
				<form className={ styles.form }>
					<div className={ styles.formRow }>
						<div className={ styles.formHeaderColumn }>
							{ 'Organize columns by:' }
						</div>
						<div className={ styles.formFieldColumn }>
							<DropDown
								value={ columnType }
								onChange={ this.onChangeColumnType }
								options={ [
									[ ColumnTypes.TRACK, 'Track' ],
									[ ColumnTypes.TOPIC, 'Topic' ],
									[ ColumnTypes.LOCATION, 'Location' ],
								] }
							/>
						</div>
					</div>
					<div className={ styles.formRow }>
						<div className={ styles.formHeaderColumn }>
							{ 'Session details:' }
						</div>
						<div className={ styles.formFieldColumn }>
							<CheckBox value={ showDescription } onChange={ this.onChangeShowDescription }>
								{ 'Show description' }
							</CheckBox>
							<CheckBox value={ showLocation } onChange={ this.onChangeShowLocation }>
								{ 'Show location' }
							</CheckBox>
							<CheckBox value={ showTopics } onChange={ this.onChangeShowTopics }>
								{ 'Show topics' }
							</CheckBox>
							<CheckBox value={ showTracks } onChange={ this.onChangeShowTracks }>
								{ 'Show track info' }
							</CheckBox>
							<CheckBox value={ showSpeakers } onChange={ this.onChangeShowSpeakers }>
								{ 'Show list of speakers' }
							</CheckBox>
							<CheckBox value={ showFormat } onChange={ this.onChangeShowFormat }>
								{ 'Show session format' }
							</CheckBox>
							<CheckBox value={ showAudience } onChange={ this.onChangeShowAudience }>
								{ 'Show target audience' }
							</CheckBox>
						</div>
					</div>
				</form>
			</div>
		);
	}

	public onChangeColumnType(optionKey: string) {
		this.props.dispatchSetColumnType(parseInt(optionKey, 10));
	}

	public onChangeShowDescription(value: boolean) {
		this.props.dispatchSetShowDescription(value);
	}

	public onChangeShowLocation(value: boolean) {
		this.props.dispatchSetShowLocation(value);
	}

	public onChangeShowTopics(value: boolean) {
		this.props.dispatchSetShowTopics(value);
	}

	public onChangeShowTracks(value: boolean) {
		this.props.dispatchSetShowTracks(value);
	}

	public onChangeShowSpeakers(value: boolean) {
		this.props.dispatchSetShowSpeakers(value);
	}

	public onChangeShowFormat(value: boolean) {
		this.props.dispatchSetShowFormat(value);
	}

	public onChangeShowAudience(value: boolean) {
		this.props.dispatchSetShowAudience(value);
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
	dispatchSetShowDescription: (show: boolean) => dispatch(displayActions.setShowDescription(show)),
	dispatchSetShowLocation: (show: boolean) => dispatch(displayActions.setShowLocation(show)),
	dispatchSetShowTopics: (show: boolean) => dispatch(displayActions.setShowTopics(show)),
	dispatchSetShowTracks: (show: boolean) => dispatch(displayActions.setShowTracks(show)),
	dispatchSetShowSpeakers: (show: boolean) => dispatch(displayActions.setShowSpeakers(show)),
	dispatchSetShowFormat: (show: boolean) => dispatch(displayActions.setShowFormat(show)),
	dispatchSetShowAudience: (show: boolean) => dispatch(displayActions.setShowAudience(show)),
	dispatchSetUseLocalTimezone: (use: boolean) => dispatch(displayActions.setUseLocalTimezone(use)),
	dispatchSetColumnType: (columnType: ColumnTypes) => dispatch(displayActions.setColumnType(columnType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayOptions)
