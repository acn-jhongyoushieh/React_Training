import axios from "axios";
import CryptoJS from "crypto-js";

const ImgurAPItest = axios.create({
  baseURL: "https://api.imgur.com/3",
});

const accessToken = sessionStorage.getItem("accessToken");

const decryptTokenFunc = (token) => {
  return CryptoJS.AES.decrypt(
    token,
    process.env.REACT_APP_CRYPTOJS_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
};

export const GetImgListAPI = async () => {
  if (accessToken) {
    const decryptToken = decryptTokenFunc(accessToken);
    if (!decryptToken) {
      throw new Error("decrypt fail");
    }

    const response = await ImgurAPItest.get("/account/me/images", {
      headers: {
        Authorization: `Bearer ${decryptToken}`,
      },
    });
    return response.data;
  } else {
    return;
  }
};

export const ImgUpload = async (file) => {
  if (accessToken) {
    const decryptToken = decryptTokenFunc(accessToken);
    await ImgurAPItest.post(
      "/image",
      { image: file },
      {
        headers: {
          Authorization: `Bearer ${decryptToken}`,
        },
      }
    )
      .then(() => {
        window.alert("ファイルアップロード成功しました。");
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } else {
    return false;
  }
};

export const UpdateImgInfoAPI = async (id, description) => {
  if (accessToken) {
    const decryptToken = decryptTokenFunc(accessToken);

    await ImgurAPItest.post(
      `/image/${id}`,
      { title: null, description: description },
      {
        headers: {
          Authorization: `Bearer ${decryptToken}`,
        },
      }
    )
      .then(() => {
        window.alert("説明更新完了しました。再度アルバムを取得してください。");
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } else {
    return false;
  }
};

//apiではなく、普通のサービス処理
export const Login = () => {
  const clientId = process.env.REACT_APP_IMGUR_API_CLIENT_ID;
  window.location.replace(
    `https://api.imgur.com/oauth2/authorize?response_type=token&client_id=${clientId}`
  );
};
