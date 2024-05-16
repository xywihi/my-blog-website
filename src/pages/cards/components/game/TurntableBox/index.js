import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { IonIcon } from "@ionic/react";
import {
  fastFoodOutline,
  basketballOutline,
  bowlingBallOutline,
  pizzaOutline,
} from "ionicons/icons";
import { addNum } from "@/util";
const icons = [
  fastFoodOutline,
  basketballOutline,
  bowlingBallOutline,
  pizzaOutline,
];
import turntableSvg from '@/assets/images/game.svg'
export default function TurntableBox({ kinds = [] }) {
  const [currentKind, setCurrentKind] = useState(null);
  const [radomNum, setRadomNum] = useState(1);
  const newAddNum = Object.assign({}, addNum);
  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     // setCurrentImageIndex(Math.floor(Math.random() * 7));
  //     if(newAddNum.num>=1000) clearInterval(timer)
  //     newAddNum.handleAddCount(1000,3.5,1000)
  //     setRotateDeg(Math.floor(Math.random() * 4))
  //   }, 0);
  //   return () => {
  //     // clearInterval(timer);
  //   };
  // }, []);

  const getRadomNum = (num) => {
    const radomNum = Math.floor(Math.random() * 4);
    if(num === radomNum){
      getRadomNum(num);
      return;
    }
      setRadomNum(radomNum);
  }
  return (
    <div className={styles.TurntableBox}>
      
      <ul
        className="heightFull flexC"
        onClick={()=>getRadomNum(radomNum)}
      >
        {kinds.map((item, index) => (
          radomNum == index &&<li
            key={item + index}
            className={`${styles.kindItemBox} textCenter`}
          >
            <div className={`font36`}>
              <IonIcon icon={icons[index]} size="18px"></IonIcon>
            </div>
            <span className="font18">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
