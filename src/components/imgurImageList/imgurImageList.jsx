import React from "react";
import styles from "./imgurImageList.module.scss";
import { UpdateImgInfoAPI } from "../../service/imgurApi";

const imgurImageList = ({ imgurData }) => {
  function updateDescription(id) {
    const description = document.querySelector(`#${id}`).value;
    const updateCheck = UpdateImgInfoAPI(id, description);
  }

  return (
    <div className={styles.imgLists}>
      <ul>
        {imgurData &&
          imgurData.map((item) => (
            <li key={item.id}>
              <div className={styles.image}>
                <img src={item.link} />
              </div>
              <div className={styles.description}>
                <p>{item.description}</p>
                <div className={styles.updateDescription}>
                  <input type="text" id={item.id} />
                  <button onClick={() => updateDescription(item.id)}>
                    説明を更新
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default imgurImageList;
