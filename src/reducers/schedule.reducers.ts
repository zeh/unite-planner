import scheduleActions from '../actions/schedule.actions';

export interface IState {
	isLoaded: boolean;
	isLoading: boolean;
	errorMessage?: string;
	url?: string;
	data?: object;
};

const DEFAULT_STATE: IState = {
	isLoaded: false,
	isLoading: false,
	errorMessage: undefined,
	url: undefined,
	data: undefined,
};

export function schedule(state: IState = DEFAULT_STATE, action: any) {
	switch (action.type) {
		case scheduleActions.TYPES.SET_URL:
			return {
				...state,
				isLoading: true,
				isLoaded: false,
				errorMessage: undefined,
				url: action.payload
			};

		case scheduleActions.TYPES.SET_DATA:
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				errorMessage: undefined,
				data: action.payload,
			};

		case scheduleActions.TYPES.SET_ERROR:
			return {
				...state,
				isLoading: false,
				isLoaded: false,
				errorMessage: action.payload,
			};

		default:
			return state;
	}
}

export default schedule;
