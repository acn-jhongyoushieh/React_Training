import axios from "axios";

const weatherRequest = axios.create({
  baseURL: "https://api.open-meteo.com/v1/",
});

export const GetWeatherApi = (request) => {
  const latLon = request.split(",");
  return weatherRequest.get(
    `forecast?latitude=${latLon[0]}&longitude=${latLon[1]}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&forecast_days=1&timezone=Asia%2FTokyo&timeformat=unixtime`
  );
};
