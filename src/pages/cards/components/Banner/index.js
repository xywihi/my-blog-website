import React, { useEffect, useState } from "react";

import styles from "./index.module.less";
import HttpRequire from "@/http/require";
const banners = [
  {
    url: "https://images.unsplash.com/photo-1599272585578-03bfc70032b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "平淡人生，浮躁心态",
    subtitle: "平淡人生，浮躁心态，梦想的美好是建立在残酷的现实之上。",
    time: "2023/09/01",
    id: 0,
  },
];

export default function Banner() {
  const [wallImage, setWallImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    let timer = setInterval(() => {
      setCurrentImageIndex(Math.floor(Math.random() * 7));
    }, 10000);
    const require = new HttpRequire();
    require
      .get("http://127.0.0.1:3000/api/bing_img")
      .then((res) => {
        setWallImage(res.images);
        wallImage &&
          setCurrentImageIndex(
            Math.floor(Math.random() * (wallImage.length - 1))
          );
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return wallImage ? (
    <>
      <div className={styles.bannerBox}>
        <img
          src={`https://cn.bing.com${wallImage[currentImageIndex].url}`}
          alt="wallpaper"
          className="opacity60_black"
        />
        <div className="pa24 flexBS column">
          <h1 className="font_wenyue fontB maB12 textSingeLine widthFull">
            <span className="maR12">{wallImage[currentImageIndex].title}</span>
          </h1>
          <h5 className="widthFull">
            <p className="maB12 textSingeLine">{wallImage[currentImageIndex].copyright}</p>
            <p className="gray">{wallImage[currentImageIndex].startdate}</p>
          </h5>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={styles.bannerBox}>
        <img src={"https://loremflickr.com/473/370/mountain"} />
        <div className="pa24 flexBS column ">
          <h1 className="font_wenyue fontB maB12 textSingeLine widthFull">
            {banners[0].title.split("，").map((item) => (
              <span className="maR12" key={item}>
                {item}
              </span>
            ))}
          </h1>
          <h5>
            <p className="maB12 textSingeLine widthFull">{banners[0].subtitle}</p>
            <p className="gray">{banners[0].time}</p>
          </h5>
        </div>
      </div>
    </>
  );
}
