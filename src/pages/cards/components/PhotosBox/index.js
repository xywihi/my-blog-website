import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";

import styles from "./index.module.less";
import Image from "@/components/Image";
import {HttpRequire} from "@/http/require";
let wallImage = [];
let timer = null;
export default function PhotosBox({
  cardSize,
  auto = true,
  time = 5000,
}) {
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
      .get("bing_img")
      .then((res) => {
        // setWallImage(res.Images);
        wallImage = res.Images;
        setNewPhotos([res.Images[moveNum], res.Images[moveNum + 1]]);
        // debugger
        // boxStyles() && autoMovePhotos(currentPhotoIndex,moveNum,res.Images);
        // wallImage.length>0 &&
        //   setCurrentImageIndex(
        //     Math.floor(Math.random() * (wallImage.length - 1))
        //   );
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    clearTimeout(timer);
    autoMove && autoMovePhotos(currentPhotoIndex, moveNum);
  }, [autoMove]);
  const boxStyles = useCallback(() => {
    return boxRef.current && window.getComputedStyle(boxRef.current);
  }, [boxRef.current]);
  const handleMovePhotos = (num) => {
    try {
      if (!boxRef.current) return;
      // 数组倒序
      let newNodes = Array.from(
        boxRef.current.childNodes[0].childNodes[0].childNodes
      ).reverse();
      boxRef.current.childNodes[0].childNodes[0].childNodes[0].remove();
      boxRef.current.childNodes[0].childNodes[0].childNodes[0].remove();
      boxRef.current.childNodes[0].childNodes[0].appendChild(newNodes[0]);
      boxRef.current.childNodes[0].childNodes[0].appendChild(newNodes[1]);
      setMoveNum(num);
      setNewPhotos((old) => {
        // console.log('xxxxxxxxxxxxx',num,(num+1)===photos.length ? 0 : num+1)
        return [
          wallImage[num],
          wallImage[num + 1 === wallImage.length ? 0 : num + 1],
        ];
      });
    } catch (error) {}
  };

  let autoMovePhotos = (photoIndex, num) => {
    timer = setTimeout(() => {
      handleMovePhotos(num + 1 === wallImage.length ? 0 : num + 1, wallImage);
      setCurrentPhotoIndex(
        photoIndex + 1 === wallImage.length ? 0 : photoIndex + 1
      );
      autoMovePhotos(
        currentPhotoIndex,
        num + 1 === wallImage.length ? 0 : num + 1
      );
    }, time);
  };
  return (
    <div
      className={styles.photosBox}
      ref={boxRef}
      onMouseEnter={() => {
        setAutoMove(false);
      }}
      onMouseLeave={() => setAutoMove(true)}
    >
      <div className="scrollbarBox">
        <ul className={`heightFull flexS ${styles.photos_list_box}`}>
          {newPhotos.map((item, index) =>
            item ? (
              <li key={"image" + index} className="heightFull">
                <Image
                  {...boxStyles()}
                  src={`https://cn.bing.com${wallImage[moveNum].url}`}
                  borderR={12}
                  alt="wallpaper"
                />
                {cardSize === "large" && (
                  <>
                    <p className="font16 pa24 colorWhite">
                      {wallImage[moveNum].title}
                    </p>
                    <span className="fontSmall pa24 colorWhite">
                      {wallImage[moveNum].copyright}
                    </span>
                  </>
                )}
              </li>
            ) : (
              <li key={"unknownImage" + index}></li>
            )
          )}
        </ul>
      </div>
      <div className={`${styles.photosBox_btns_box} controller`}>
        <ul className={`${styles.photosBox_btns} flexB`}>
          {wallImage.map((item, index) => (
            <li
              key={"unknown" + index}
              className={
                moveNum === index
                  ? `${styles.photosBox_btn_active} photosBox_btn_active bg_blue`
                  : `${styles.photosBox_btn} bg1`
              }
              onClick={() => {
                handleMovePhotos(index, wallImage);
              }}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
