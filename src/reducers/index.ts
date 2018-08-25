import { combineReducers } from 'redux'

import schedule from './schedule.reducers';

export default combineReducers({
	scheduleState: schedule,
});
