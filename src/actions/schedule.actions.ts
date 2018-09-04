import Schedule from "../data/Schedule";

const TYPES = {
	SET_URL: 'SET_URL',
	SET_SCHEDULE: 'SET_SCHEDULE',
	SET_ERROR: 'SET_ERROR',
	SET_SESSION_SELECTED: 'SET_SESSION_SELECTED',
	TOGGLE_SESSION_SELECTED: 'TOGGLE_SESSION_SELECTED',
};

export default {
	TYPES,

	setUrl: (url: string) => ({
		type: TYPES.SET_URL,
		payload: url
	}),

	setSchedule: (schedule: Schedule) => ({
		type: TYPES.SET_SCHEDULE,
		payload: schedule
	}),

	setError: (message: string) => ({
		type: TYPES.SET_ERROR,
		payload: message
	}),

	setSessionSelected: (sessionId: string, selected: boolean) => ({
		type: TYPES.SET_SESSION_SELECTED,
		payload: { id: sessionId, selected }
	}),

	toggleSessionSelected: (sessionId: string) => ({
		type: TYPES.TOGGLE_SESSION_SELECTED,
		payload: sessionId
	}),
};
