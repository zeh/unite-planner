import Schedule from "../data/Schedule";

const TYPES = {
	SET_URL: 'SET_URL',
	SET_SCHEDULE: 'SET_SCHEDULE',
	SET_ERROR: 'SET_ERROR',
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
};
