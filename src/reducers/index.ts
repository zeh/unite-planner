import { combineReducers } from 'redux'

import display from './display.reducers';
import schedule from './schedule.reducers';

export default combineReducers({
	displayState: display,
	scheduleState: schedule,
});
