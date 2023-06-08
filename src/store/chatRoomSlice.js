import { createSlice } from "@reduxjs/toolkit";

const chatRoomContentsSlice = createSlice({
  name: "chatRoomContents",
  initialState: { currentRoom: "", roomList: [] },
  reducers: {
    setRoomList(state, action) {
      state.roomList.push({ ...action.payload, roomId: state.roomList.length });
      state.currentRoom = state.roomList.length - 1;
    },
    removeRoom(state, action) {
      const id = action.payload;
      state.roomList = state.roomList.filter((room) => room.roomId !== id);
    },
    setCurrentRoom(state, action) {
      state.currentRoom = action.payload;
    },
    setMessageList(state, action) {
      state.roomList[action.payload.currentRoom].messageList.push(
        action.payload.messageInfo
      );
    },
  },
});

export const { setRoomList, setCurrentRoom, setMessageList, removeRoom } =
  chatRoomContentsSlice.actions;

export const cahtRoomSlice = chatRoomContentsSlice.reducer;
