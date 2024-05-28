import React, { useState, useEffect } from "react";
import styles from "./styles.module.less";
import "./index.less";
import Image from "@/components/Image";
import { create, trash } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { deleteNewsItem } from "@/http/require";
import { useNavigate } from "react-router-dom";
import { showStatusBox } from "@/store/actions";
function NewsItemBox({ newItem, newIndex, arrLength, handleDeleteSelf }) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("newItem", newItem);
  });

  const handleDeleteItem = () => {
    deleteNewsItem({ id: newItem.ID }).then((res) => {
      debugger;
      if (res.code === 200) {
        //删除成功
        showStatusBox({
          show: true,
          message: "文章删除成功",
          status: "success",
        });
        //删除数组中的元素
        handleDeleteSelf(newItem.ID);
      }
    });
  };
  return (
    <div className={styles.newsBox}>
      <div className={`flexB maB24 ${styles.titleBox}`}>
        <h1 className="fontB">{newItem.Title}</h1>
        <p className={styles.dateBox}>
          <span className="font16 fontB colorGray">
            {new Date(newItem.CreatedAt).getMonth() + 1}.{" "}
          </span>
          <span className="font36 fontB">
            {new Date(newItem.CreatedAt).getDate().toString()}
          </span>
        </p>
      </div>
      <p
        className={styles.textContentBox}
        dangerouslySetInnerHTML={{ __html: newItem.Content }}
      >
        {/* {newItem.Content} */}
        {/* <span className="fontB font24">
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
        )} */}
      </p>
      {newItem.imgs && (
        <div className={`maV24 flexB ${styles.imgsBox}`}>
          {newItem.imgs.map((it, i) => (
            <div className="widthFull" key={i}>
              <Image src={it} width="100%" height="320px" borderR="12px" />
            </div>
          ))}
        </div>
      )}
      {/* <div className={styles.aceEditorBox}>
        <AceEditorBox setCode={setCode} height="200px"/>
        </div> */}
      <br />
      <div className={`flexB gray maV12 fontSmall ${styles.bottomBox}`}>
        <span>
          作者：
          {newItem.Author?.split("@")[0].slice(0, 1).toUpperCase() +
            newItem.Author?.split("@")[0].slice(1) || "未知"}
        </span>
        <div className="flexB">
          <div
            className={`${styles.search_btn} font24 colorGray maR12 icon_hover cursor action`}
            data-content="编辑内容"
            onClick={() => navigate(`/news/edit/${newItem.ID}`)}
          >
            <IonIcon icon={create} size="36px"></IonIcon>
          </div>
          <div
            className={`${styles.search_btn} font24 colorGray icon_hover cursor action`}
            data-content="删除此篇文章"
            onClick={handleDeleteItem}
          >
            <IonIcon icon={trash} size="36px"></IonIcon>
          </div>
        </div>
      </div>
      {newIndex !== arrLength - 1 && (
        <div className={`${styles.deviseBox} flexB`}>
          <div className={`${styles.deviseLine} bg4`}></div>
          <div className={`${styles.devisePoint} bg_gray`}></div>
          <div className={`${styles.deviseLine} bg4`}></div>
        </div>
      )}
    </div>
  );
}

export default NewsItemBox;
