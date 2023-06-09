import { createSlice } from "@reduxjs/toolkit";

const chatRoomContentsSlice = createSlice({
  name: "chatRoomContents",
  initialState: { currentRoom: "", roomList: [] },
  reducers: {
    setRoomList(state, action) {
      const roomId = setId();
      state.roomList.push({ ...action.payload, roomId: roomId });
      state.currentRoom = roomId;
    },
    removeRoom(state, action) {
      const id = action.payload;
      state.roomList = state.roomList.filter((room) => room.roomId !== id);
    },
    setCurrentRoom(state, action) {
      state.currentRoom = action.payload;
    },
    setMessageList(state, action) {
      state.roomList
        .find((room) => room.roomId === action.payload.currentRoom)
        .messageList.push(action.payload.messageInfo);
    },
  },
});

const setId = () => {
  return Math.random().toString(16).slice(2);
};

export const { setRoomList, setCurrentRoom, setMessageList, removeRoom } =
  chatRoomContentsSlice.actions;

export const cahtRoomSlice = chatRoomContentsSlice.reducer;
