import { clearPendingAction } from "../store/reducers/pendingActionReducer";
import type { AppDispatch, RootState } from "../store/store";


export const replayPendingActions = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { actions } = getState().pendingAction;

    for (const action of actions) {
        try {
            if (action.type === "redux") {
                dispatch(action.method(action.args)); // Redux thunk
            } else if (action.type === "normal") {
                action.method(...(Array.isArray(action.args) ? action.args : [action.args])); // Normal function
            }
        } catch (err) {
            console.error("Error replaying action:", err);
        }
    }

    dispatch(clearPendingAction());
};
