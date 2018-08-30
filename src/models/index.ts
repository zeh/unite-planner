import { IState as IDisplayState } from './../reducers/display.reducers';
import { IState as IScheduleState } from './../reducers/schedule.reducers';

interface IStore {
	scheduleState: IScheduleState;
	displayState: IDisplayState;
}

export {
	IStore,
	IScheduleState,
	IDisplayState,
};
