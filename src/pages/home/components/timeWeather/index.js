import React,{useEffect, useState} from "react";
import styles from './styles.module.less'
import {IonIcon} from "@ionic/react"
import HttpRequire from "../../../../http/require"
import { bookOutline, colorWand, calendar, checkmarkCircle } from 'ionicons/icons';
const apiKey = 'beac683c911d3facd1e6f802ddd7b972'; // 替换成你的OpenWeatherMap API密钥
const city = 'Chengdu'; // 替换成你想要查询的城市
const TimeWeather = (props) => {
    const [currentDate,setCurrentDate] = useState(new Date())
    const [weather,setWeather] = useState(null)
    useEffect(() => {
        const http = new HttpRequire
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=zh_cn`;
        http.get(apiUrl).then(res=>{
            console.log("res",res)
            if(res.cod===200){
                setWeather(res.weather[0])
            }
        })
        let timer = setInterval(()=>{
            setCurrentDate(new Date())
        },10000)
        return ()=>{
            clearTimeout(timer)
        }
    }, [])
    return (
        <div className={`waterfall-item borderR12 ${styles.item2_inner3_inner2} bg1 paH24 paV12 cardBox`} >
            <div className={`${styles.item2_inner3_inner2_inner1} flexS`}>{(currentDate.getHours().toString().length>1 ? '':'0')+currentDate.getHours()}<span className="flicker">:</span>{(currentDate.getMinutes().toString().length>1 ? '':'0')+currentDate.getMinutes()}</div>
            <div className={styles.item2_inner3_inner2_inner2}>{currentDate.getMonth()+1}月</div>
            <div className={`${styles.item2_inner3_inner2_inner3} gray`}>{currentDate.getFullYear()}/{currentDate.getMonth()+1}/{currentDate.getDate()}</div>
            {weather ? <div className={`${styles.item2_inner3_inner2_inner3} gray flexS`}>
                <span className="maR6">{weather.description.split('，')[0]}</span>
                <img className={styles.weatherIcon} src={`https://openweathermap.org/img/w/${weather.icon}.png`}></img>
            </div> : '-'}
        </div>
    )
}


export default TimeWeather;