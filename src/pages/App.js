import styles from "./App.module.scss";
import { useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import TodoList from "./TodoList/TodoList";
import WeatherTool from "./WeatherTool/WeatherTool";
import ImgurTool from "./imgurTool/imgurTool";
import ChatRoom from "./chatRoom/chatRoom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { chatUserSlice, chatUserListSlice } from "../store/chatUserSlice";
import { cahtRoomSlice } from "../store/chatRoomSlice";

const store = configureStore({
  reducer: {
    chatUser: chatUserSlice,
    chatUserList: chatUserListSlice,
    cahtRoomContents: cahtRoomSlice,
  },
});

function App() {
  useEffect(() => {
    document.title = `React作品集`;
  });
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <header className={styles.header}>
          <div className={styles.siteName}>
            <Link to="/React_Training">React練習サイト</Link>
          </div>
        </header>
        <section className={styles.content}>
          <Routes>
            <Route path="/React_Training" element={<HomePage />} />
            <Route
              path="/React_Training/works/todolist"
              element={<TodoList />}
            />
            <Route
              path="/React_Training/works/weathertool"
              element={<WeatherTool />}
            />
            <Route
              path="/React_Training/works/imgurTool"
              element={<ImgurTool />}
            />
            <Route
              path="/React_Training/works/chatRoom"
              element={<ChatRoom />}
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </section>
        <footer className={styles.footer}>
          jhong-you.shieh React_Training
        </footer>
      </div>
    </Provider>
  );
}

export default App;
