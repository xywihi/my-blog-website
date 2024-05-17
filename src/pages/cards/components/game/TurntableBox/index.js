import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { IonIcon } from "@ionic/react";
import {
  bowlingBall,
  fastFood,
  basketball,
  pizza,
} from "ionicons/icons";
const icons = [
  bowlingBall,
  fastFood,
  basketball,
  pizza,
];
export default function TurntableBox({ kinds = [] }) {
  const [radomNum, setRadomNum] = useState(1);
  const getRadomNum = (num) => {
    const radomNum = Math.floor(Math.random() * 4);
    if(num === radomNum){
      getRadomNum(num);
      return;
    }
      setRadomNum(radomNum);
  }
  return (
    <div className={styles.turntableBox}>
      
      <ul
        className="heightFull flexC"
        onClick={()=>getRadomNum(radomNum)}
      >
        {kinds.map((item, index) => (
          radomNum == index &&<li
            key={item + index}
            className={`${styles.kindItemBox} textCenter ${item.color}`}
          >
            <div>
              <IonIcon icon={icons[index]} size="18px"></IonIcon>
            </div>
            <span className="font16">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
