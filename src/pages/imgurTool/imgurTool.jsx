import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetImgListAPI, Login, ImgUpload } from "../../service/imgurApi";
import CryptoJS from "crypto-js";
import ImgurImageList from "../../components/imgurImageList/imgurImageList";
import styles from "./imgurTool.module.scss";

const ImgurTool = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");

  const [imgurList, setImgurList] = React.useState([]);

  React.useEffect(() => {
    if (hash) {
      const url = new URL(window.location.href);
      const urlHash = new URLSearchParams(url.hash.substring(1));
      console.log("useEffect");
      setToken(urlHash.get("access_token"));
      navigate("/React_Training/works/imgurTool");
    }
  }, []);

  function setToken(token) {
    if (!sessionStorage.getItem("accessToken")) {
      const encryptedToken = CryptoJS.AES.encrypt(
        token,
        process.env.REACT_APP_CRYPTOJS_SECRET_KEY
      ).toString();
      sessionStorage.setItem("accessToken", encryptedToken);
    }
  }

  async function GetImgList() {
    const response = await GetImgListAPI();
    if (response) {
      setImgurList(response);
    } else {
      window.alert("申し訳ございません。データ取得が失敗しまいました。");
    }
  }

  async function imgUpload() {
    const file = document.querySelector(`#fileUpload`).files[0];

    const fileBase64 = await getBase64(file);

    await ImgUpload(fileBase64.split(",")[1]);
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  function imgurLogin() {
    if (!accessToken) {
      Login();
    }
  }

  function imgurLogout() {
    if (accessToken) {
      sessionStorage.removeItem("accessToken");
      window.location.reload(false);
    }
  }

  return (
    <div className={styles.imgurTool}>
      {accessToken ? (
        <div>
          <button className={styles.mainBtn} onClick={() => GetImgList()}>
            アルバム取得
          </button>
          <button className={styles.mainBtn} onClick={() => imgurLogout()}>
            ログアウト
          </button>
          <div className={styles.uplodeArea}>
            <input type="file" id="fileUpload" />
            <button className={styles.uplodeBtn} onClick={() => imgUpload()}>
              アップロード
            </button>
          </div>
          {imgurList.data ? <ImgurImageList imgurData={imgurList.data} /> : ""}
        </div>
      ) : (
        <button className={styles.mainBtn} onClick={() => imgurLogin()}>
          imgur ログイン
        </button>
      )}
    </div>
  );
};

export default ImgurTool;
