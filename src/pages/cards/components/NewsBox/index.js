import React, { useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import styles from "./index.module.less";

const banners = [
  {
    url: "https://images.unsplash.com/photo-1599272585578-03bfc70032b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "平淡人生，浮躁心态",
    subtitle: "平淡人生，浮躁心态，梦想的美好是建立在残酷的现实之上。",
    time: "2023/09/01",
    id: 0,
  },
];

export default function NewsBox({ cardSize }) {
  useEffect(() => {}, []);
  return (
    <div className="borderR12 maB12">
      {cardSize === "large" ? (
        <div></div>
      ) : (
        <div className={styles.newsBox_small}>
          <h3 className="title maB12 flexB">
            <span>最新动态</span>{" "}
            <div className="cursor icon_hover">
              <IonIcon icon={menu} size="36px"></IonIcon>
            </div>
          </h3>
          <ul className="widthFull">
            <li className="newsItemBox flexB maB6 paV6">
              <span className="textSingeLine maR12 font14">
                人间有神兽，来自九重天
              </span>
              <span className="fontSmall gray">2023/09/05</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
