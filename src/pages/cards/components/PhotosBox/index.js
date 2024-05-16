import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";

import styles from "./index.module.less";
import Image from "@/components/Image";
import HttpRequire from "@/http/require";
const photos = [
  {
    url: "https://images.unsplash.com/photo-1599272585578-03bfc70032b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "平淡人生，浮躁心态",
    subtitle: "一年之计,莫如树谷:十年之计,莫如树木;终身之计,莫如树人。",
    time: "2023/09/01",
    id: 0,
  },
  {
    url: "https://loremflickr.com/473/370/sky",
    title: "不是智者才能获得成功,努力奋斗的人依旧也可以。",
    subtitle: "不是智者才能获得成功,努力奋斗的人依旧也可以。",
    time: "2023/09/01",
    id: 1,
  },
  {
    url: "https://loremflickr.com/473/370/city",
    title: "平淡人生，浮躁心态",
    subtitle: "常常告诫自己不要在一棵树上吊死,结果常常是还没有进入树林就已经迷了路。",
    time: "2023/09/01",
    id: 2,
  },
  {
    url: "https://loremflickr.com/473/370/sea",
    title: "平淡人生，浮躁心态",
    subtitle: "人生就像钟表,可以回到起点,却已不是昨天!",
    time: "2023/09/01",
    id: 3,
  },
];
let wallImage=[]
let timer=null
export default function PhotosBox({ wNum, hNum, unitWidth,cardSize,auto=true,time=5000 }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [autoMove, setAutoMove] = useState(auto);
  const [newPhotos, setNewPhotos] = useState([]);
  const [moveNum, setMoveNum] = useState(0);
  const boxRef = useRef(null);
  const [newWallImage, setWallImage] = useState([]);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    
    const require = new HttpRequire();
    require
      .get("http://127.0.0.1:3000/api/bing_img")
      .then((res) => {
        // setWallImage(res.images);
        wallImage=res.images;
        setNewPhotos([res.images[moveNum],res.images[moveNum+1]])
        // debugger
        // boxStyles() && autoMovePhotos(currentPhotoIndex,moveNum,res.images);
        // wallImage.length>0 &&
        //   setCurrentImageIndex(
        //     Math.floor(Math.random() * (wallImage.length - 1))
        //   );
      })
      .catch((err) => {
        console.log(err);
      });
    return ()=>{
      clearTimeout(timer);
    }
  }, []);
  useEffect(() => {
    clearTimeout(timer);
    autoMove && autoMovePhotos(currentPhotoIndex,moveNum)
  }, [autoMove]);
  const boxStyles = useCallback(()=>{return boxRef.current && window.getComputedStyle(boxRef.current);},[boxRef.current])
  const handleMovePhotos = (num) => {
    if(!boxRef.current)return;
    // 数组倒序
    let newNodes = Array.from(boxRef.current.childNodes[0].childNodes[0].childNodes).reverse();
    boxRef.current.childNodes[0].childNodes[0].childNodes[0].remove();
    boxRef.current.childNodes[0].childNodes[0].childNodes[0].remove();
    boxRef.current.childNodes[0].childNodes[0].appendChild(newNodes[0]);
    boxRef.current.childNodes[0].childNodes[0].appendChild(newNodes[1]);
    setMoveNum(num);
    setNewPhotos(old=>{
      // console.log('xxxxxxxxxxxxx',num,(num+1)===photos.length ? 0 : num+1)
      return [wallImage[num],wallImage[(num+1)===wallImage.length ? 0 : num+1]];
    })
  };

  let autoMovePhotos = (photoIndex,num) => {
    timer = setTimeout(() => {
      handleMovePhotos(num+1===wallImage.length ? 0 : num+1,wallImage)
      setCurrentPhotoIndex(photoIndex+1===wallImage.length ? 0 : photoIndex+1)
      autoMovePhotos(currentPhotoIndex,num+1===wallImage.length ? 0 : num+1)
    }, time);
  }
  return (
    
    <div className={styles.photosBox} ref={boxRef} onMouseEnter={()=>{
      setAutoMove(false)
    }} onMouseLeave={()=>setAutoMove(true)}>
      <div className="scrollbarBox">
        <ul className={`heightFull flexS ${styles.photos_list_box}`}>
          {newPhotos.map((item,index) => (
            item ? <li key={"image"+index} className="heightFull">
            <Image {...boxStyles()} src={`https://cn.bing.com${wallImage[moveNum].url}`} borderR={12} alt="wallpaper"/>
           { cardSize==='large' && 
            <>
              <p className="font16 pa24 colorWhite">
              {wallImage[moveNum].title}
            </p>
            <span className="fontSmall pa24 colorWhite">
              {wallImage[moveNum].copyright}
            </span>
            </>
           }
          </li> : <li key={"unknownImage"+index}></li>
          ))}
        </ul>
      </div>
      <div className={styles.photosBox_btns_box}>
        <ul className={`${styles.photosBox_btns} flexB`}>
          {wallImage.map((item,index) => (
            <li
              key={"unknown"+index}
              className={
               (moveNum===index)
                  ? `${styles.photosBox_btn_active} bg_blue`
                  : `${styles.photosBox_btn} bg1`
              }
              onClick={() => {
                handleMovePhotos(index,wallImage)
              }}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
