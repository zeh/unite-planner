// We need to use require() for json-loader to work correctly (yuck)
// tslint:disable:no-var-requires
import { call, put, takeLatest } from 'redux-saga/effects'

import Schedule from '../data/Schedule';
import scheduleActions from './../actions/schedule.actions';

const offlineSchedule = require('./../resources/offline_schedule');

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
		console.warn('Using offline schedule instead (may be out-of-date).');
		return offlineSchedule;
	}).then((json: any) => {
		return Schedule.fromJSON(json);
	});
}

function* setUrl(action: any) {
	const result = yield call(fetchServerResponse, action.payload);
	if (result) {
		yield put(scheduleActions.setSchedule(result));
	} else if (result instanceof Error) {
		yield put(scheduleActions.setError(result.message));
	}
}

export default function* scheduleSagas() {
	yield takeLatest(scheduleActions.TYPES.SET_URL, setUrl);
}
