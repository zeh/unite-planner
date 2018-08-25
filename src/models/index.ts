import { IState as IScheduleState } from './../reducers/schedule.reducers';

interface IStore {
	scheduleState: IScheduleState
}

export {
	IStore,
	IScheduleState,
};
