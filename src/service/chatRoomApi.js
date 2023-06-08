import axios from "axios";

const chatGPTapi = axios.create({
  baseURL: "https://api.openai.com/v1",
});

export const getGPTAnswer = async (messageList) => {
  if (messageList) {
    return await chatGPTapi.post(
      "/chat/completions",
      { model: "gpt-3.5-turbo", messages: messageList },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_API_KEY}`,
        },
      }
    );
  } else {
    window.alert("ChatGPTの回答取得失敗しまいました。");
    return false;
  }
};
