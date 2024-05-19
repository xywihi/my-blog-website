import React, { useEffect, useState, memo } from "react";
import styles from "./styles.module.less";
import {HttpRequire} from "@/http/require";

const apiKey = "beac683c911d3facd1e6f802ddd7b972"; // 替换成你的OpenWeatherMap API密钥
const city = "Renshou"; // 替换成你想要查询的城市
const TimeWeather = ({ cardSize }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    if(cardSize!='small'){
      const http = new HttpRequire("weather");
    const apiUrl = `http://localhost:3000/api/weather`;
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=zh_cn`;
    http
      .get(apiUrl,{city,apiKey})
      .then((res) => {
        // console.log("res------",res)
        if (res.cod === 200) {
          setWeather(res.weather[0]);
        }
      })
      .catch((err) => {
        // alert(err)
      });
    }
    let timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 10000);
    // console.log('wallImage------------------')
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <>
      {cardSize === "small" ? (
        <div className={styles.item2_inner3_inner2_inner1_small}>
          {(currentDate.getHours().toString().length > 1 ? "" : "0") +
            currentDate.getHours()}
          <span className={styles.flicker}>:</span>
          {(currentDate.getMinutes().toString().length > 1 ? "" : "0") +
            currentDate.getMinutes()}
        </div>
      ) : (
        <div className={`${styles.item2_inner3_inner2}`}>
          <div className={`${styles.item2_inner3_inner2_inner1} flexS`}>
            {(currentDate.getHours().toString().length > 1 ? "" : "0") +
              currentDate.getHours()}
            <span className={styles.flicker}>:</span>
            {(currentDate.getMinutes().toString().length > 1 ? "" : "0") +
              currentDate.getMinutes()}
          </div>
          <div className={styles.item2_inner3_inner2_inner2}>
            {currentDate.getMonth() + 1}月
          </div>
          <div className={`${styles.item2_inner3_inner2_inner3} gray`}>
            {currentDate.getFullYear()}/{currentDate.getMonth() + 1}/
            {currentDate.getDate()}
          </div>
          {weather && (
            <div className={`${styles.item2_inner3_inner2_inner3} gray flexS`}>
              <span className="maR6">{weather.description.split("，")[0]}</span>
              <img
                className={styles.weatherIcon}
                src={`https://openweathermap.org/img/w/${weather.icon}.png`}
              ></img>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TimeWeather;
