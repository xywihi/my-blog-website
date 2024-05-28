import React, { useEffect, useState } from "react";
import styles from "./index.module.less";

import star from "./icons/star.svg";
import bookmark from "./icons/bookmark.svg";
import tickSquare from "./icons/tickSquare.svg";
import paperNegative from "./icons/paperNegative.svg";

import {IonIcon} from "@ionic/react"

export default function YoYBox({ data={one: 0, two: 0, three: 0, four: 0} }) {
  const [circlePath, setCirclePath] = useState("M 114 114 m -64.9519 -37.5 a 75 75 0 1 0 129.9 0");
  useEffect(() => {

    setCirclePath(`M 114 114 m -64.9519 -37.5 a 75 75 0 1 0 129.9 0`)
  }, [data]);
  return (
    <div className={`${styles.YoYBox} bg1 borderR12 pa24 heightFull`}>
      <div className={`${styles.itemBox} action`} data-content="点赞率">
        <div className={styles.downBox}></div>
        <div className={styles.up1Box} style={{width:`${data.one}%`}}></div>
        <div className={styles.content1Box}>
        <div><IonIcon icon={tickSquare}></IonIcon></div>
        <span>{`${data.one}%`}</span>
        </div>
      </div>
      <div className={`${styles.itemBox} action`}  data-content="好评率">
        <div className={styles.downBox}></div>
        <div className={styles.up2Box} style={{width:`${data.two}%`}}></div>
        <div className={styles.content2Box}>
        <div><IonIcon icon={bookmark}></IonIcon></div>
          <span>{`${data.two}%`}</span>
        </div>
      </div>
      <div className={`${styles.itemBox} action`} data-content="回访率">
        <div className={styles.downBox}></div>
        <div className={styles.up3Box} style={{width:`${data.three}%`}}></div>
        <div className={styles.content3Box}>
        <div><IonIcon icon={star}></IonIcon></div>
        <span>{`${data.three}%`}</span>
        </div>
        
        
      </div>
      <div className={`${styles.itemBox} action`} data-content="退单率">
        <div className={styles.downBox}></div>
        <div className={styles.up4Box} style={{width:`${data.four}%`}}></div>
        <div className={styles.content4Box}>
          <div>
          <IonIcon icon={paperNegative}></IonIcon>
          </div>
        <span>{`${data.four}%`}</span>
        </div>
      </div>
    </div>
  );
}
