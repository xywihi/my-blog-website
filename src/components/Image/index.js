import React, { useEffect } from "react";

import styles from "./index.module.less";

export default function Image({ width, height, src,borderR,fit='cover' }) {
  useEffect(() => {}, []);
  return (
    <div className={styles.imageBox} style={{ width: width, height: height }}>
      <div className={`${styles.img} opacity60_black`} style={{backgroundImage:`url(${src})`,borderRadius:borderR,backgroundSize:fit,backgroundPosition:'center'}}>
      </div>
    </div>
  );
}
