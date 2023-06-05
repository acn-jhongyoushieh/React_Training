import React, { useState, useEffect } from "react";
import styles from "./chatRoom.module.scss";
import ChatRoomHeader from "../../components/ChatRoomcomponents/chatRoomHeader";
import ChatRoomManager from "../../components/ChatRoomcomponents/chatRoomManager";
import ChatArea from "../../components/ChatRoomcomponents/chatArea";
const ChatRoom = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ChatRoomHeader}>
        <ChatRoomHeader />
      </div>

      <div className={styles.UserArea}>
        <div className={styles.ChatRoomManager}>
          <ChatRoomManager />
        </div>
        <div className={styles.ChatArea}>
          <ChatArea />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
