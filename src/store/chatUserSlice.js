import { createSlice } from "@reduxjs/toolkit";

const userIniList = {
  chatUserList: [
    {
      label: "ユーザーA",
      value: "A",
    },
    {
      label: "ユーザーB",
      value: "B",
    },
    {
      label: "ユーザーC",
      value: "C",
    },
  ],
};

const userIniState = {
  chatUserInfo: {
    userName: "ユーザーA",
    userEmail: "A",
  },
};

const chatUserInfoSlice = createSlice({
  name: "chatUserInfo",
  initialState: userIniState,
  reducers: {
    setChatUser(state, action) {
      state.chatUserInfo = action.payload;
    },
  },
});

const chatUserInfoListSlice = createSlice({
  name: "chatUserList",
  initialState: userIniList,
  reducers: {
    setChatListUser(state, action) {
      state.chatUserList.push(action.payload);
    },
  },
});

export const { setChatUser } = chatUserInfoSlice.actions;
export const { setChatListUser } = chatUserInfoListSlice.actions;

export const chatUserSlice = chatUserInfoSlice.reducer;
export const chatUserListSlice = chatUserInfoListSlice.reducer;
