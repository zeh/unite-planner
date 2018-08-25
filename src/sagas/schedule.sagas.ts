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
	});
}

function* setUrl(action: any) {
	const data = yield call(fetchServerResponse, action.payload);
	if (data && data.data) {
		yield put(scheduleActions.setData(data.data));
	}
}

export default function* scheduleSagas() {
	yield takeLatest(scheduleActions.TYPES.SET_URL, setUrl);
}
