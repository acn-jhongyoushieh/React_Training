import React from "react";
import styles from "./chatRoomManager.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setRoomList, setCurrentRoom } from "../../store/chatRoomSlice";

const ChatRoomManager = () => {
  const chatRoomContents = useSelector((state) => state.cahtRoomContents);
  const disPatch = useDispatch();

  const addChatRoom = () => {
    const newChatName = window.prompt("チャットルーム名を入力してください。");
    if (newChatName) {
      disPatch(
        setRoomList({
          roomName: newChatName,
          messageList: [],
        })
      );
    } else {
      window.alert("チャットルーム名に入力不備がありました。");
    }
  };

  const changeChatRoom = (roomId) => {
    disPatch(setCurrentRoom(roomId));
  };

  return (
    <div className={styles.ChatRoomManager}>
      <button className={styles.addChat} onClick={addChatRoom}>
        + New Chat
      </button>
      <div className={styles.chatList}>
        {chatRoomContents.roomList.length ? (
          chatRoomContents.roomList.map((roomContent) => (
            <div>
              <div
                className={
                  chatRoomContents.currentRoom === roomContent.roomId
                    ? styles.currentItem
                    : styles.chatItem
                }
                onClick={() => changeChatRoom(roomContent.roomId)}
              >
                <p className={styles.chatTitle}>{roomContent.roomName}</p>
                <p className={styles.chatContent}>
                  {roomContent.messageList.length
                    ? roomContent.messageList[
                        roomContent.messageList.length - 1
                      ].userName +
                      "：" +
                      roomContent.messageList[
                        roomContent.messageList.length - 1
                      ].message
                    : "まだメッセージがございません"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ChatRoomManager;
