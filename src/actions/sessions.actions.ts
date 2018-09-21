const TYPES = {
	SET_SESSION_SELECTED: 'SET_SESSION_SELECTED',
	TOGGLE_SESSION_SELECTED: 'TOGGLE_SESSION_SELECTED',
};

export default {
	TYPES,

	setSessionSelected: (sessionId: string, selected: boolean) => ({
		type: TYPES.SET_SESSION_SELECTED,
		payload: { id: sessionId, selected }
	}),

	toggleSessionSelected: (sessionId: string) => ({
		type: TYPES.TOGGLE_SESSION_SELECTED,
		payload: sessionId
	}),
};
