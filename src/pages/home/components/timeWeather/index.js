import React,{useEffect, useState, memo} from "react";
import styles from './styles.module.less'
const TimeWeather = ({weatherInfo}) => {
    const [currentDate,setCurrentDate] = useState(new Date())
    useEffect(() => {
        
        let timer = setInterval(()=>{
            setCurrentDate(new Date())
        },10000)
        // console.log('wallImage------------------')
        return ()=>{
            clearTimeout(timer)
        }
    }, [])
    return (
        <div className={`waterfall-item borderR12 ${styles.item2_inner3_inner2} bg1 paH24 paV12 cardBox`} >
            <div className={`${styles.item2_inner3_inner2_inner1} flexS`}>{(currentDate.getHours().toString().length>1 ? '':'0')+currentDate.getHours()}<span className={styles.flicker}>:</span>{(currentDate.getMinutes().toString().length>1 ? '':'0')+currentDate.getMinutes()}</div>
            <div className={styles.item2_inner3_inner2_inner2}>{currentDate.getMonth()+1}月</div>
            <div className={`${styles.item2_inner3_inner2_inner3} gray`}>{currentDate.getFullYear()}/{currentDate.getMonth()+1}/{currentDate.getDate()}</div>
            {weatherInfo && 
                <div className={`${styles.item2_inner3_inner2_inner3} gray flexS`}>
                    <span className="maR6">{weatherInfo.weather?.[0].description.split('，')[0]}</span>
                    <img className={styles.weatherIcon} src={`https://openweathermap.org/img/w/${weatherInfo.weather?.[0].icon}.png`}></img>
                </div>
            }
        </div>
    )
}


export default memo(TimeWeather,(prevProps,nextProps)=>{
    // console.log('prevProps------',prevProps)
    return false
});