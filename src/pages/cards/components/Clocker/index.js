import React, { useEffect,useState,useRef } from "react";

import styles from "./index.module.less";
export default function Clocker({ wNum, hNum, unitWidth }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [circles, setCircles] = useState(0);
  const secondesRef = useRef(null);
  const secondesTwoRef = useRef(null);
  useEffect(() => {
    animate();
    return () => {
    };
  }, []);

  // 动画函数
  const animate = () => {
    let time=new Date();
    let seconds = time.getSeconds();
    if(secondesRef.current){
      if(seconds*6>354 || seconds*6<6){
        secondesRef.current.style.opacity=0;
        secondesTwoRef.current.style.display="block";
      }else{
        secondesRef.current.style.opacity=1;
        secondesTwoRef.current.style.display="none";
      }
      secondesRef.current.style.transform = `rotate(${seconds * 6}deg)`;
    }
    // 递归调用requestAnimationFrame实现连续动画
    requestAnimationFrame(animate);
  }

  return (
    <>
      {/* 编写时钟代码 */}
      <div className={styles.clocker}>
        <div className={`${styles.hour_hand} bg_black`} style={{ transform: `rotate(${currentDate.getHours() * 30 + currentDate.getMinutes() / 2}deg)` }}></div>
        <div className={styles.minute_hand}></div>
        <div  ref={secondesRef} className={styles.second_hand}></div>
        <div  ref={secondesTwoRef} className={styles.second_two_hand}></div>
        <div className={`${styles.center_dot} bg_black`} ></div>
        {[...Array(12)].map((_, i) => (
            <div className={`${styles.hour_mark} bg_black`} key={i} style={{ transform: `rotate(${i * 30}deg)` }}></div>
        ))}
      </div>
    </>
  );
}
