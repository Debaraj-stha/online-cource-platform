import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

type MessageType = "info" | "warning" | "success" | "error";

export interface Message {
  type: MessageType;
  id: number;
  messages: string[];
}

// Thunk to set a message with auto-clear timeout
export const setMessageWithTimeout = (message: Message, timeout: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(setMessage(message));

    setTimeout(() => {
      dispatch(clearMessage(message.id));
    }, timeout);
  };
};

const initialState: Message[] = [];

const messageReducer = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<Message | Message[]>) {
      const payload = action.payload;
      const newMessages = Array.isArray(payload) ? payload : [payload];
      state.push(...newMessages);
    },
    clearMessage(state, action: PayloadAction<number>) {
      return state.filter((msg) => msg.id !== action.payload);
    },
  },
});

export const { setMessage, clearMessage } = messageReducer.actions;
export default messageReducer.reducer;
