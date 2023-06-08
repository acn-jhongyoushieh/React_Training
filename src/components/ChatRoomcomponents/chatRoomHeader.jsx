import React from "react";
import styles from "./chatRoomHeader.module.scss";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { setChatUser, setChatListUser } from "../../store/chatUserSlice";

const ChatRoomHeader = () => {
  const defaultUser = useSelector((state) => state.chatUser).chatUserInfo;
  const defaultUserList = useSelector((state) => state.chatUserList);
  const disPatch = useDispatch();

  const userList = defaultUserList.chatUserList;

  const setUser = (currentUser) => {
    disPatch(
      setChatUser({
        userName: currentUser.label,
        userEmail: currentUser.value,
      })
    );
  };

  const chatUserAdd = () => {
    const newUserName = window.prompt("ユーザー名を入力してください。");
    const newUserEmail = window.prompt("メールアドレスを入力してください。");
    if (
      newUserName &&
      newUserEmail &&
      newUserEmail.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      disPatch(
        setChatListUser({
          label: newUserName,
          value: newUserEmail,
        })
      );
    } else {
      window.alert(
        "ユーザー名、または、メールアドレスに入力不備がありました。"
      );
    }
  };

  return (
    <div className={styles.chatheader}>
      <Select
        className={styles.userSelect}
        options={userList}
        onChange={(selectedValue) => setUser(selectedValue)}
        defaultValue={{
          value: defaultUser.userEmail,
          label: defaultUser.userName,
        }}
      />
      <button className={styles.addUser} onClick={chatUserAdd}>
        ユーザー追加 +
      </button>
    </div>
  );
};

export default ChatRoomHeader;
