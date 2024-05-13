import React, { useEffect } from "react";

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

export default function PhotosBox({ wNum, hNum, unitWidth }) {
  useEffect(() => {
    console.log("wNum, hNum, unitWidth", wNum, hNum, unitWidth);
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
