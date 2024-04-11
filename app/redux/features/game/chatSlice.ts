import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  sender: string;
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: Message[]; // Array of message objects { sender, content, timestamp }
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
