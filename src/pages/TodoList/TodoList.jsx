import React, { useState, useEffect } from "react";
import styles from "./TodoList.module.scss";

const TodoList = () => {
  const [todoData, setData] = React.useState([]);
  const [todoLength, setLength] = React.useState(0);

  useEffect(() => {
    setLength(todoData.filter((todo) => todo.checked === false).length);
  });

  function addTodo() {
    const value = document.querySelector("#todoInput").value;
    if (value) {
      setData([
        ...todoData,
        {
          id: todoData.length + 1,
          todoName: value,
          checked: false,
        },
      ]);
    }
    document.querySelector("#todoInput").value = "";
  }

  function todoChecked(id) {
    if (id) {
      setData(
        todoData.map((todo) => {
          if (todo.id === id) {
            todo.checked = !todo.checked;
          }
          return todo;
        })
      );
    }
  }

  function listClear() {
    setData([]);
  }

  return (
    <div>
      <div className={styles.ListPanel}>
        <h1>Todo リスト</h1>

        <div className={styles.ListArea}>
          <div className={styles.addTodo}>
            <input type="text" className={styles.addTextbox} id="todoInput" />
            <button className={styles.addButton} onClick={() => addTodo()}>
              +
            </button>
          </div>

          <div className={styles.list}>
            <ul>
              {todoData &&
                todoData.map((todo) => (
                  <li className={styles.item}>
                    <input
                      type="checkbox"
                      onClick={() => todoChecked(todo.id)}
                    />
                    <label className={todo.checked ? styles.todoChecked : ""}>
                      {todo.todoName}
                    </label>
                  </li>
                ))}
            </ul>
          </div>

          <div className={styles.info}>
            <p className={styles.itemNumbers}>
              未完了件数：<p className={styles.number}>{todoLength}</p>件
            </p>
            <button className={styles.clearButton} onClick={() => listClear()}>
              リストを削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
