import { call, put, takeLatest } from 'redux-saga/effects'

import scheduleActions from './../actions/schedule.actions';

function fetchServerResponse(url: string) {
	return fetch(url, {
		method: 'GET',
		headers:{
			'Content-Type': 'application/json',
		}
	}).then((response) => {
		return response.json();
	}).catch((error) => {
		console.warn('Error loading:', error);
		return error;
	});
}

function* setUrl(action: any) {
	const result = yield call(fetchServerResponse, action.payload);
	if (result && result.data) {
		yield put(scheduleActions.setData(result.data));
	} else if (result instanceof Error) {
		yield put(scheduleActions.setError(result.message));
	}
}

export default function* scheduleSagas() {
	yield takeLatest(scheduleActions.TYPES.SET_URL, setUrl);
}
