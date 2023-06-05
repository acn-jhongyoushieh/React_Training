import React from "react";
import Select from "react-select";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import { GetWeatherApi } from "../../service/weatherApi";
import styles from "./WeatherTool.module.scss";

const WeatherTool = () => {
  const options = [
    { value: "35.69,139.69", label: "東京" },
    { value: "34.69,135.50", label: "大阪" },
    { value: "41.78,140.74", label: "函館" },
  ];

  const [weatherData, setData] = React.useState(null);
  const [weatherLabel, setLabel] = React.useState(null);
  let searchTarget = { value: "35.69,139.69", label: "東京" };

  React.useEffect(() => {
    GetWeatherApi(searchTarget.value).then((response) => {
      setData(response.data);
      setLabel(searchTarget.label);
    });
  }, []);

  function setSelectedValue(selectedValue) {
    searchTarget = selectedValue;
  }

  function getTodayWeather(searchTarget) {
    GetWeatherApi(searchTarget.value).then((response) => {
      setData(response.data);
      setLabel(searchTarget.label);
    });
  }

  return (
    <div>
      <WeatherCard
        weatherData={weatherData}
        weatherLabel={weatherLabel}
      ></WeatherCard>
      <div className={styles.searchArea}>
        <Select
          className={styles.dropdown}
          options={options}
          defaultValue={{ value: "35.69,139.69", label: "東京" }}
          onChange={(selectedValue) => setSelectedValue(selectedValue)}
        ></Select>
        <button
          className={styles.searchButton}
          onClick={() => getTodayWeather(searchTarget)}
        >
          本日の天気
        </button>
      </div>
    </div>
  );
};

export default WeatherTool;
