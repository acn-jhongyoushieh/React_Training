import React from "react";
import styles from "./chatRoomManager.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  setRoomList,
  setCurrentRoom,
  removeRoom,
} from "../../store/chatRoomSlice";

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

  const deleteChatRoom = (event, roomId) => {
    event.stopPropagation();
    if (
      window.confirm(
        "チャットルーム、及び、チャットの内容が削除されますが、よろしいでしょうか？"
      )
    ) {
      disPatch(removeRoom(roomId));
      window.alert("チャットルームが削除されました");
    }
  };

  return (
    <div className={styles.ChatRoomManager}>
      <div className={styles.buttonArea}>
        <button className={styles.addChat} onClick={addChatRoom}>
          + New Chat
        </button>
      </div>
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
                <div className={styles.chatInfo}>
                  <p className={styles.chatTitle}>{roomContent.roomName}</p>
                  <img
                    className={styles.deleteIcon}
                    onClick={(event) =>
                      deleteChatRoom(event, roomContent.roomId)
                    }
                    src={require(`../../assets/icons/deleteicon.png`)}
                  />
                </div>
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
