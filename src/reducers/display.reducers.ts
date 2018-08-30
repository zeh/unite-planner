import displayActions from '../actions/display.actions';

export enum ColumnTypes {
	LOCATION,
	TRACK,
	TOPIC,
};

export interface IState {
	showDescription: boolean;
	showLocation: boolean;
	showTopics: boolean;
	showTracks: boolean;
	showSpeakers: boolean;
	columnType: ColumnTypes;
};

const DEFAULT_STATE: IState = {
	showDescription: true,
	showLocation: true,
	showTopics: true,
	showTracks: false,
	showSpeakers: true,
	columnType: ColumnTypes.TRACK,
};

export function display(state: IState = DEFAULT_STATE, action: any) {
	switch (action.type) {
		case displayActions.TYPES.SET_SHOW_DESCRIPTION:
			return {
				...state,
				showDescription: action.payload
			};

		case displayActions.TYPES.SET_SHOW_LOCATION:
			return {
				...state,
				showLocation: action.payload
			};

		case displayActions.TYPES.SET_SHOW_TOPICS:
			return {
				...state,
				showTopics: action.payload
			};

		case displayActions.TYPES.SET_SHOW_TRACKS:
			return {
				...state,
				showTracks: action.payload
			};

		case displayActions.TYPES.SET_SHOW_SPEAKERS:
			return {
				...state,
				showSpeakers: action.payload
			};

		case displayActions.TYPES.SET_COLUMN_TYPE:
			return {
				...state,
				columnType: action.payload
			};

		default:
			return state;
	}
}

export default display;
