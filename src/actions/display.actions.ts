import { ColumnTypes } from '../reducers/display.reducers';

const TYPES = {
	SET_SHOW_DESCRIPTION: 'SET_SHOW_DESCRIPTION',
	SET_SHOW_LOCATION: 'SET_SHOW_LOCATION',
	SET_SHOW_TOPICS: 'SET_SHOW_TOPICS',
	SET_SHOW_TRACKS: 'SET_SHOW_TRACKS',
	SET_SHOW_SPEAKERS: 'SET_SHOW_SPEAKERS',
	SET_COLUMN_TYPE: 'SET_COLUMN_TYPE',
};

export default {
	TYPES,

	setShowDescription: (show: boolean) => ({
		type: TYPES.SET_SHOW_DESCRIPTION,
		payload: show
	}),

	setShowLocation: (show: boolean) => ({
		type: TYPES.SET_SHOW_LOCATION,
		payload: show
	}),

	setShowTopics: (show: boolean) => ({
		type: TYPES.SET_SHOW_TOPICS,
		payload: show
	}),

	setShowTracks: (show: boolean) => ({
		type: TYPES.SET_SHOW_TRACKS,
		payload: show
	}),

	setShowSpeakers: (show: boolean) => ({
		type: TYPES.SET_SHOW_SPEAKERS,
		payload: show
	}),

	setColumns: (columnType: ColumnTypes) => ({
		type: TYPES.SET_COLUMN_TYPE,
		payload: columnType
	}),
};
