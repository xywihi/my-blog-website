import React, { useState } from "react";
import styles from "./styles.module.less";
import Image from "@/components/Image";

function NewsItemBox({ newItem, newIndex, arrLength }) {
  const [showDeatil, setShowDeatil] = useState(false);
  const handleContentText = (content) => {
    return [content[0], content.slice(1).split("\n")];
  };
  return (
    <>
      <div className={`flexB maB24 ${styles.titleBox}`}>
        <h1 className="fontB">{newItem.title}</h1>
        <p className={styles.dateBox}>
          <span className="font16 fontB colorGray">
            {new Date(newItem.date).getMonth() + 1}.{" "}
          </span>
          <span className="font36 fontB">
            {new Date(newItem.date).getDate()}
          </span>
        </p>
      </div>
      <p className={styles.textContentBox}>
        <span className="fontB font24">
          {handleContentText(newItem.content)[0]}
        </span>
        {handleContentText(newItem.content)[1]
          .slice(0, 3)
          .map((text, f) => (
            <span key={f}>
              <span className="font16" key={f}>
                {text}
              </span>
              <br />
              <br />
            </span>
          ))}
        {showDeatil
          ? handleContentText(newItem.content)[1]
              .slice(3)
              .map((text, f) => (
                <span key={f}>
                  <span className="font16" key={f}>
                    {text}
                  </span>
                  <br />
                  <br />
                </span>
              ))
          : "..."}
        {handleContentText(newItem.content)[1].length > 3 && (
          <span
            className={`cursor icon_hover maT12 gray ${styles.showDeatilBtn}`}
            onClick={() => setShowDeatil(!showDeatil)}
          >
            {!showDeatil ? "查看详细内容" : "收起详细内容"}
          </span>
        )}
      </p>
      <div className={`maV24 flexB ${styles.imgsBox}`}>
        {newItem.imgs.map((it, i) => (
          <div className="widthFull" key={i}>
            <Image src={it} width="100%" height="320px" borderR="12px" />
          </div>
        ))}
      </div>
      {/* <div className={styles.aceEditorBox}>
        <AceEditorBox setCode={setCode} height="200px"/>
        </div> */}
      <p className="flexB gray fontSmall">
        <span>字数：{newItem.content.length}</span>
      </p>
      {newIndex !== arrLength-1 && (
        <div className={`${styles.deviseBox} flexB`}>
          <div className={`${styles.deviseLine} bg4`}></div>
          <div className={`${styles.devisePoint} bg_gray`}></div>
          <div className={`${styles.deviseLine} bg4`}></div>
        </div>
      )}
    </>
  );
}

export default NewsItemBox;
