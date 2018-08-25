import {fork} from 'redux-saga/effects';

import scheduleSagas from './schedule.sagas';

export default function* () {
    yield fork(scheduleSagas);
}
