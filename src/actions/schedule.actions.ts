const TYPES = {
	SET_URL: 'SET_URL',
	SET_DATA: 'SET_DATA',
	SET_ERROR: 'SET_ERROR',
};

export default {
	TYPES,

	setUrl: (url: string) => ({
		type: TYPES.SET_URL,
		payload: url
	}),

	setData: (data: object) => ({
		type: TYPES.SET_DATA,
		payload: data
	}),

	setError: (message: string) => ({
		type: TYPES.SET_ERROR,
		payload: message
	}),
};
