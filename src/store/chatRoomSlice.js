import { createSlice } from "@reduxjs/toolkit";

/*
const chatRoomContents = {
  currentRoom: "",
  roomList: [
    {
      roomId: "",
      roomName: "",
      messageList: [
        {
          userName: "",
          message: "",
          timestamp: "",
        },
      ],
    },
  ],
};
*/

const chatRoomContentsSlice = createSlice({
  name: "chatRoomContents",
  initialState: { currentRoom: "", roomList: [] },
  reducers: {
    setRoomList(state, action) {
      state.roomList.push({ ...action.payload, roomId: state.roomList.length });
      state.currentRoom = state.roomList.length - 1;
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

export const { setRoomList, setCurrentRoom, setMessageList } =
  chatRoomContentsSlice.actions;

export const cahtRoomSlice = chatRoomContentsSlice.reducer;
