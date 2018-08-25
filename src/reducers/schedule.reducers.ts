import scheduleActions from '../actions/schedule.actions';

export const REDUCER_NAME = 'schedule';

export interface IState {
	url?: string;
	data?: object;
};

const DEFAULT_STATE: IState = {
	url: undefined,
	data: undefined,
}

export function schedule(state: IState = DEFAULT_STATE, action: any) {
	switch (action.type) {
		case scheduleActions.TYPES.SET_URL:
			return {
				...state,
				url: action.payload
			};

		case scheduleActions.TYPES.SET_DATA:
			return {
				...state,
				data: action.payload,
			};

		default:
			return state;
	}
}

export default schedule;
