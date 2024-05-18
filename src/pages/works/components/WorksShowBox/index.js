import React, { useEffect } from "react";

import styles from "./index.module.less";
import PhotosBox from "@/pages/cards/components/PhotosBox";
import { IonIcon } from "@ionic/react";
import { logoGithub } from "ionicons/icons";
export default function WorksShowBox() {
  useEffect(() => {}, []);
  return (
    <div className={`heightFull bg1 pa24 borderR12 ${styles.worksShowBox}`}>
      <div>
        <PhotosBox auto={false} />
        <div className={`${styles.worksShowBox_text_box}`}>
          <p>在岁月中远行</p>
          <p className="colorGray">
            <span>04</span>
            <span> /01</span>
          </p>
          <p className="fontSmall gray">
            人生，就是为了突破、创造而来的，寻着光奔跑，最后把自己变成一束光。
          </p>
          <p>...</p>
        </div>
      </div>
      <p className={`flexB  ${styles.worksShowBox_text_bottom_box}`}>
        <span className="fontB">只为不断成长自己，不管它是多么艰辛。</span>
        <a
          className="cursor icon_hover icon maT3 textCenter"
          href="https://github.com/xywihi"
          target="_blank"
        >
          <IonIcon icon={logoGithub} size="36px"></IonIcon>
        </a>
      </p>
    </div>
  );
}
