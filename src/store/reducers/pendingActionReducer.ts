import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type PendingActionType="redux"|"normal"

export interface PendingAction {
  args: any;
  method: Function;
  type?:PendingActionType
}

interface PendingActionState {
  isPending: boolean;
  actions: PendingAction[];
}

const initialState: PendingActionState = {
  isPending: false,
  actions: [],
};

const pendingActionSlice = createSlice({
  name: "pendingAction",
  initialState,
  reducers: {
    setPendingAction(state, action: PayloadAction<PendingAction>) {
      state.isPending = true;
      state.actions.push(action.payload);
    },
    clearPendingAction(state) {
      state.isPending = false;
      state.actions = []; // clear all pending actions
    },
    removeFirstPendingAction(state) {
      state.actions.shift();
      if (state.actions.length === 0) state.isPending = false;
    },
  },
});

export const { 
    setPendingAction, 
    clearPendingAction,
     removeFirstPendingAction
     } =
  pendingActionSlice.actions;

export default pendingActionSlice.reducer;
