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
	showFormat: boolean;
	showAudience: boolean;
	useLocalTimezone: boolean;
	columnType: ColumnTypes;
};

const DEFAULT_STATE: IState = {
	showDescription: true,
	showLocation: true,
	showTopics: true,
	showTracks: false,
	showSpeakers: false,
	showFormat: false,
	showAudience: false,
	useLocalTimezone: false,
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

		case displayActions.TYPES.SET_SHOW_FORMAT:
			return {
				...state,
				showFormat: action.payload
			};

		case displayActions.TYPES.SET_SHOW_AUDIENCE:
			return {
				...state,
				showAudience: action.payload
			};

		case displayActions.TYPES.SET_USE_LOCAL_TIMEZONE:
			return {
				...state,
				useLocalTimeZone: action.payload
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
