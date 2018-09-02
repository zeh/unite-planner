import { ColumnTypes } from '../reducers/display.reducers';

const TYPES = {
	SET_SHOW_DESCRIPTION: 'SET_SHOW_DESCRIPTION',
	SET_SHOW_LOCATION: 'SET_SHOW_LOCATION',
	SET_SHOW_TOPICS: 'SET_SHOW_TOPICS',
	SET_SHOW_TRACKS: 'SET_SHOW_TRACKS',
	SET_SHOW_SPEAKERS: 'SET_SHOW_SPEAKERS',
	SET_SHOW_FORMAT: 'SET_SHOW_FORMAT',
	SET_SHOW_AUDIENCE: 'SET_SHOW_AUDIENCE',
	SET_USE_LOCAL_TIMEZONE: 'SET_USE_LOCAL_TIMEZONE',
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

	setShowFormat: (show: boolean) => ({
		type: TYPES.SET_SHOW_FORMAT,
		payload: show
	}),

	setShowAudience: (show: boolean) => ({
		type: TYPES.SET_SHOW_AUDIENCE,
		payload: show
	}),

	setUseLocalTimezone: (use: boolean) => ({
		type: TYPES.SET_USE_LOCAL_TIMEZONE,
		payload: use
	}),

	setColumnType: (columnType: ColumnTypes) => ({
		type: TYPES.SET_COLUMN_TYPE,
		payload: columnType
	}),
};
