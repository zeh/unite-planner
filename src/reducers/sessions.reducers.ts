import scheduleActions from '../actions/sessions.actions';

export interface IState {
	selectedSessions: string[];
};

const DEFAULT_STATE: IState = {
	selectedSessions: [],
};

export function schedule(state: IState = DEFAULT_STATE, action: any) {
	switch (action.type) {
		case scheduleActions.TYPES.SET_SESSION_SELECTED:
			const { id, selected } = action.payload;
			return {
				...state,
				selectedSessions: selected
					? [...state.selectedSessions, id]
					: state.selectedSessions.filter((s) => s !== id)
			};

		case scheduleActions.TYPES.TOGGLE_SESSION_SELECTED:
			const sessionId = action.payload;
			const alreadySelected = state.selectedSessions.indexOf(sessionId) > -1;
			return {
				...state,
				selectedSessions: alreadySelected
					? state.selectedSessions.filter((s) => s !== sessionId)
					: [...state.selectedSessions, sessionId]
			};

		default:
			return state;
	}
}

export default schedule;
