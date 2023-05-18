import React from 'react';
import styles from './WeatherCard.module.scss';

const WeatherTool = ({weatherData, weatherLabel}) => {
    function weatherSwitch(weatherCode) {
        switch (weatherCode) {
            case 0: return 'weather0.png'
            case 1:
            case 2: 
            case 3:
            case 4: return 'weather1.png'
            case 45:
            case 48:
            case 51:
            case 53:
            case 55: return 'weather1.png'
            case 61:
            case 63: 
            case 65: return 'weather4.png'
            case 66:
            case 67: return 'weather6.png'
            default: return 'undefined'
            }
    }

    return <div>
        { weatherData ? 
            <div className={styles.weatherCard}>
                <h1>{weatherLabel}</h1>
                <div className={styles.mainInfo}>
                    <div className={styles.weatherIcon}>
                        <img src={require(`../../assets/images/${weatherSwitch(weatherData.current_weather.weathercode)}`)} />
                    </div>
                    <div className={styles.temperature}>{weatherData.current_weather.temperature}</div>
                    <div className={styles.degrees}>°C</div>
                </div>
                <div className={styles.windInfo}>
                    <div className={styles.windIcon}>
                        <img src={require(`../../assets/images/weatherWind.png`)} />
                    </div>
                    <div className={styles.windspeed}>{weatherData.current_weather.windspeed} Km/h</div>
                </div>
            </div> : <div></div>
        }        
    </div>
}

export default WeatherTool;