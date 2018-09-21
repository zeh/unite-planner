import { IState as IDisplayState } from './../reducers/display.reducers';
import { IState as IScheduleState } from './../reducers/schedule.reducers';
import { IState as ISessionsState } from './../reducers/sessions.reducers';

interface IStore {
	displayState: IDisplayState;
	scheduleState: IScheduleState;
	sessionsState: ISessionsState;
}

export {
	IStore,
	IDisplayState,
	IScheduleState,
	ISessionsState,
};
