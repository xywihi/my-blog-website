import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
export default function HeathyBox({ data = 0 }) {
  const [circlePath, setCirclePath] = useState();
  useEffect(() => {
    const angle = 240*(1-data/100)+60;
    const sin330Value = Math.sin((330 * Math.PI) / 180);
    const cos330Value = Math.cos((330 * Math.PI) / 180);
    let lx = sin330Value * 75;
    let ly = -cos330Value * 75;
    var angleInRadians = (angle * Math.PI) / 180;
      var sinValue = Math.sin(angleInRadians);
      var cosValue = Math.cos(angleInRadians);
      var nx = Math.round(sinValue * 75 - ly);
      var ny = Math.round(-cosValue * 75 - lx);
      setCirclePath(`M 114 114 m -64.9519 -37.5 a 75 75 0 ${angle<=120?'1':'0'} 0 ${nx} ${ny}`);
  }, [data]);
  return (
    <div className={`${styles.heathyBox} bg1 borderR12 pa24 flexB`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 228 228"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 114 114 m -64.9519 -37.5 a 75 75 0 1 0 129.9 0"
          fill="none"
          stroke={data>=60?"#46F0D329":data>=60?"#F7B50129":"#FA350129"}
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d={circlePath}
          fill="none"
          stroke={data>=60?"#46F0D3":data>=60?"#F7B501":"#FA3501"}
          strokeWidth="20"
          strokeLinecap="round"
        />
      </svg>
      <div className={styles.grassBox} data-text="健康值">
        <svg
          width="36.673462"
          height="37.868042"
          viewBox="0 0 36.6735 37.868"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <desc>Created with Pixso.</desc>
          <defs />
          <path
            d="M0 0C12.79 0 23.16 10.37 23.16 23.16L23.16 25.31C10.37 25.31 0 14.94 0 2.14L0 0Z"
            fill={data>=60?"#46F0D3":data>=60?"#F7B501":"#FA3501"}
            fillOpacity="1.000000"
            fillRule="evenodd"
          />
          <path
            id="矩形 26"
            d="M18.13 22.61L23.6 22.61L23.6 35.13C23.6 36.64 22.38 37.86 20.86 37.86C19.35 37.86 18.13 36.64 18.13 35.13L18.13 22.61Z"
            fill={data>=60?"#46F0D3":data>=60?"#F7B501":"#FA3501"}
            fillOpacity="1.000000"
            fillRule="evenodd"
          />
          <path
            id="矩形 25"
            d="M36.67 8.05C27.68 8.05 20.4 15.34 20.4 24.32L20.4 25.83C29.38 25.83 36.67 18.55 36.67 9.56L36.67 8.05Z"
            fill={data>=60?"#46F0D329":data>=60?"#F7B50129":"#FA350129"}
            fillOpacity="1.000000"
            fillRule="evenodd"
          />
        </svg>
      </div>
      <p className={`fontB widthFull ${styles.heathyValue}`}>{data + "%"}</p>
    </div>
  );
}
