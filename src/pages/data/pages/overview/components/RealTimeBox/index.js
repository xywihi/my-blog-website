import React, { useEffect,useMemo } from "react";
import styles from "./index.module.less";
// import SmoothedLine from "@/components/echarts/SmoothedLine";
import LineBox from './components/LineBox'
export default function RealTimeBox({ data }) {
  const total = useMemo(()=>data.lineData.reduce((pre, cur) => pre + cur, 0), [data])
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className={`${styles.realTimeBox} bg1 borderR12 pa24`}>
      {/* <SmoothedLine/> */}
      <div>
        <LineBox data={data}/>
      </div>
      <div className="column">
        <p className="fontB font24 colorGreen maB24">{total.toLocaleString('en-US')}</p>
        <div className="maB12">
          <p className="fontSmall gray maB6">每小时访问量</p>
          <p className={styles.smallValueBox}>{Math.ceil(total/data.lineData.length).toLocaleString('en-US')}T</p>
        </div>
        <div>
          <p className="fontSmall gray maB6">平均访问时长</p>
          <p className={styles.smallValueBox}>124M</p>
        </div>
      </div>
    </div>
  );
}
