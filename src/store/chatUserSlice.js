import { createSlice } from "@reduxjs/toolkit";

const userIniList = {
  chatUserList: [
    {
      label: "ユーザーA",
      value: "userA@test.com",
    },
    {
      label: "ユーザーB",
      value: "userB@test.com",
    },
    {
      label: "ユーザーC",
      value: "userC@test.com",
    },
  ],
};

const userIniState = {
  chatUserInfo: {
    userName: "ユーザーA",
    userEmail: "userA@test.com",
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
