import { combineReducers } from 'redux'

import display from './display.reducers';
import schedule from './schedule.reducers';
import sessions from './sessions.reducers';

export default combineReducers({
	displayState: display,
	sessionsState: sessions,
	scheduleState: schedule,
});
