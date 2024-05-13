import React, { useEffect } from "react";

import styles from "./index.module.less";


export default function CardCreator({ wNum, hNum,minWNum,minHNum,padding=0, unitWidth,children }) {
  useEffect(() => {
    console.log("wNum, hNum, unitWidth", wNum, hNum, unitWidth);
  }, []);
  return (
    <div
      className="borderR12 maB12 bg1 cardBox cardBoxShadow" style={{ padding: `${padding}px`,minHeight: `${minHNum*unitWidth}px`,minWidth: `${minWNum*unitWidth}px`}}
    >
      {children}
    </div>
  );
}
