import React, { useEffect } from "react";

import styles from "./index.module.less";

const banners = [
  {
    url: "https://images.unsplash.com/photo-1599272585578-03bfc70032b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "愿你走出半生，归来仍是少年",
    subtitle: "希望人生,不管经历过多少人生坎坷与挫折,依然能够保持着少年人的赤子之心,积极乐观,自信坦荡。",
    time: "2024/05/07",
    id: 0,
  },
];

export default function EmailBox({ wNum, hNum, unitWidth }) {
  useEffect(() => {
  }, []);
  return (
    <div
      className="borderR12 maB12 bg1 cardBox"
    >
      <div className={styles.bannerBox}>
        <img
          src={"https://loremflickr.com/473/370/mountain"}
          className="borderTR12"
        />
        <div className="pa24 flexBS column">
          <h1 className="font_wenyue fontB maB12">
            {banners[0].title.split("，").map((item) => (
              <span className="maR12" key={item}>
                {item}
              </span>
            ))}
          </h1>
          <h5>
            <p className="maB12">{banners[0].subtitle}</p>
            <p className="gray">{banners[0].time}</p>
          </h5>
        </div>
      </div>
    </div>
  );
}
