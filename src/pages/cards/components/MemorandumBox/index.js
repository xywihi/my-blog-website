import React, { useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { addCircle, trash } from "ionicons/icons";
import styles from "./index.module.less";

export default function MemorandumBox({}) {
  useEffect(() => {}, []);
  return (
    <div className={`${styles.memorandumBox} heightFull`}>
      <h3 className="title maB12 flexB widthFull">
        <span>备忘录</span>{" "}
        <div className="cursor icon_hover">
          <IonIcon icon={addCircle} size="36px"></IonIcon>
        </div>
      </h3>
      <ul className={`${styles.listBox} scrollbarBox scrollbarBox_hidden`}>
        <li className={styles.list_years}>
          <div className="flexB">
            {/* <h2 className={`${styles.year} fontB maB12`}>2024</h2> */}
            <h4 className={`${styles.mouth} maB6 fontB colorGray`}>05</h4>
          </div>
          <ul className={`${styles.dayList} maB6`}>
            <li className="pa12 bg3 borderR12">
              <div className="flexB">
                <h4 className="fontB maB6">上午开会</h4>
                <div className="cursor icon_hover colorGray">
                  <IonIcon icon={trash} size="36px"></IonIcon>
                </div>
              </div>
              <p className="font16 colorGray">明天上午10:30参加会议！</p>
            </li>
            <li className="pa12 bg3 borderR12">
              <div className="flexB">
                <h4 className="fontB maB6">周末聚餐</h4>
                <div className="cursor icon_hover colorGray">
                  <IonIcon icon={trash} size="36px"></IonIcon>
                </div>
              </div>
              <p className="font16 colorGray">25号公司聚餐，出去野营...</p>
            </li>
            <li className="pa12 bg3 borderR12">
              <div className="flexB">
                <h4 className="fontB maB6">技术研讨会</h4>
                <div className="cursor icon_hover colorGray">
                  <IonIcon icon={trash} size="36px"></IonIcon>
                </div>
              </div>
              <p className="font16 colorGray">
                26号参加AI科技研讨会，准备必要材料，并将材料共享到群里...
              </p>
            </li>
            <li className="pa12 bg3 borderR12">
            <div className="flexB">
                <h4 className="fontB maB6">出去吃火锅</h4>
                <div className="cursor icon_hover colorGray">
                  <IonIcon icon={trash} size="36px"></IonIcon>
                </div>
              </div>
              <p className="font16 colorGray">
                28号晚上与XXX一起去小巷街火锅店吃火锅！
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
