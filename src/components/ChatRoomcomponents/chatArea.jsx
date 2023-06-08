import React, { useState, useRef } from "react";
import styles from "./chatArea.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setMessageList } from "../../store/chatRoomSlice";
import { DotPulse } from "@uiball/loaders";
import { getGPTAnswer } from "../../service/chatRoomApi";
import moment from "moment";

const ChatArea = () => {
  const [isLoading, setIsLoading] = useState(false);

  const chatRoomContents = useSelector((state) => state.cahtRoomContents);
  const currentUser = useSelector((state) => state.chatUser).chatUserInfo;
  const disPatch = useDispatch();
  const inputMessage = useRef();

  const targetMessageRange = 5;

  const sendByKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    } else {
      return;
    }
  };

  const sendMessage = async () => {
    if (inputMessage.current.value) {
      disPatch(
        setMessageList({
          currentRoom: chatRoomContents.currentRoom,
          messageInfo: {
            userName: currentUser.userName,
            userEmail: currentUser.userEmail,
            message: inputMessage.current.value,
            timestamp: moment().format("YYYY/MM/DD HH:mm:ss"),
          },
        })
      );

      if (inputMessage.current.value.includes("@ChatGPT")) {
        const messageList =
          chatRoomContents.roomList[chatRoomContents.currentRoom].messageList;
        const targetMessage = messageList.slice(
          Math.max(messageList.length - targetMessageRange, 1)
        );

        const requestMessage = targetMessage.map((messageItem) => {
          return {
            role: messageItem.userName === "ChatGPT" ? "assistant" : "user",
            content: messageItem.message,
            name: emailToName(messageItem.userEmail),
          };
        });
        requestMessage.push({
          role: "user",
          content: inputMessage.current.value,
          name: emailToName(currentUser.userEmail),
        });
        inputMessage.current.value = "";
        await getGPTAnsCall(requestMessage);
        return;
      }
      inputMessage.current.value = "";
    }
  };

  const emailToName = (email) => {
    const name = email.replace("@", "_").replace("-", "_").replace(/\./g, "_");
    return name;
  };

  const getGPTAnsCall = async (requestMessage) => {
    setIsLoading(true);
    await getGPTAnswer(requestMessage)
      .then((answer) => {
        setIsLoading(false);
        disPatch(
          setMessageList({
            currentRoom: chatRoomContents.currentRoom,
            messageInfo: {
              userName: "ChatGPT",
              message: answer.data.choices[0].message.content,
              timestamp: moment().format("YYYY/MM/DD HH:mm:ss"),
            },
          })
        );
      })
      .catch((error) => {
        setIsLoading(false);
        throw new Error(error.message);
      });
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
        {isLoading ? (
          <div className={styles.friendMessage}>
            <div className={styles.loadingMessage}>
              <DotPulse size={24} speed={1.3} color="black" />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.sendArea}>
        <input type="text" ref={inputMessage} onKeyDown={sendByKeyDown}></input>
        <button onClick={sendMessage}>＞</button>
      </div>
    </div>
  );
};

export default ChatArea;
