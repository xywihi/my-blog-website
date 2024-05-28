import React,{useEffect, useState} from "react";
import styles from "./index.module.less";
let outTotal=0
export default function TotalNumberBox({ data }) {
  const [total,setTotal]= useState("0")
  useEffect(() => {
    animate();
  }, []);

  // 动画函数
  const animate = () => {
    // let radom = Math.random() * 1;
    let radom = 1;
    if(outTotal<Number(data.total)){
        outTotal+=radom;
        setTotal(old=>(outTotal).toString());
    }else{
      if(outTotal>Number(data.total)){
        setTotal(old=>(data.total).toString());
      }
      return 
    }
    // 递归调用requestAnimationFrame实现连续动画
    requestAnimationFrame(animate);
  }
  return (
    <div className={`${styles.totalNumberBox} bg1 borderR12 pa24`}>
      <div className={styles.titleBox}>
        <p className="fontB"><span>{Number(total.split('.')[0]).toLocaleString('en-US')}</span><span className="font14 gray">{total.split('.')[1] && '.' + total.split('.')[1]}</span></p>
        <p className="colorGray fontSmall">{data.unit}</p>
      </div>
      <div className={`${styles.title} flexB`}>
        <p>{data.type}</p>
        {data.offset && (
          <p
            className={`flexB block font14 colorWhite paH6 paV3 borderR6 ${
              data.symbol == "+" ? "bg_red" : "bg_green"
            }`}
          >
            <span className="maR12">{data.symbol}</span>
            <span className="colorWhite">{data.offset}</span>
          </p>
        )}
      </div>
    </div>
  );
}
