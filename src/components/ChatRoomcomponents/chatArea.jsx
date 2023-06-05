import React, { useRef } from "react";
import styles from "./chatArea.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setMessageList } from "../../store/chatRoomSlice";
import moment from "moment";

const ChatArea = () => {
  const chatRoomContents = useSelector((state) => state.cahtRoomContents);
  const currentUser = useSelector((state) => state.chatUser).chatUserInfo;
  const disPatch = useDispatch();
  const inputMessage = useRef();

  const sendByKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    } else {
      return;
    }
  };

  const sendMessage = () => {
    if (inputMessage.current.value) {
      disPatch(
        setMessageList({
          currentRoom: chatRoomContents.currentRoom,
          messageInfo: {
            userName: currentUser.userName,
            message: inputMessage.current.value,
            timestamp: moment().format("YYYY/MM/DD HH:mm:ss"),
          },
        })
      );

      if (inputMessage.current.value.includes("@ChatGPT")) {
        chatRoomContents.roomList[
          chatRoomContents.currentRoom
        ].messageList.reduceRight((acc, cur, index) => {
          console.log(cur);
          console.log(index);
        });
      }
      inputMessage.current.value = "";
    }
  };

  if (!chatRoomContents.roomList.length) {
    return (
      <div className={styles.ChatArea}>
        <h3>+ New Chat をクリックして、チャットを始めよう！</h3>
      </div>
    );
  }

  return (
    <div className={styles.ChatArea}>
      <div className={styles.ChatContent}>
        {chatRoomContents.roomList[chatRoomContents.currentRoom].messageList &&
          chatRoomContents.roomList[
            chatRoomContents.currentRoom
          ].messageList.map((message, index, messageList) => (
            <div
              className={
                message.userName === currentUser.userName
                  ? styles.MyMessage
                  : styles.friendMessage
              }
            >
              {messageList[index - 1]?.userName === message.userName ? (
                ""
              ) : (
                <div className={styles.userInfoArea}>
                  <h3 className={styles.userName}>{message.userName}</h3>
                  <p className={styles.timestamp}>
                    {moment(message.timestamp).format("MM/DD HH:mm")}
                  </p>
                </div>
              )}
              <p className={styles.userMessage}>{message.message}</p>
            </div>
          ))}
      </div>
      <div className={styles.sendArea}>
        <input type="text" ref={inputMessage} onKeyDown={sendByKeyDown}></input>
        <button onClick={sendMessage}>＞</button>
      </div>
    </div>
  );
};

export default ChatArea;
