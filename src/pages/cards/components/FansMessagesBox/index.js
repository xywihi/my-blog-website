import React, { useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import styles from "./index.module.less";

export default function FansMessagesBox({}) {
  useEffect(() => {}, []);
  return (
    <div className="borderR12 maB12 bg1 cardBox">
      <div className={styles.messagesBox}>
        {/* 粉丝留言卡片 */}
        <div className="borderR12 maB12">
          <h3 className="title maB12 flexB widthFull">
            <span>粉丝留言</span>{" "}
            <div className="cursor icon_hover">
              <IonIcon icon={menu} size="36px"></IonIcon>
            </div>
          </h3>
          <div className="content flexB column flexFull widthFull">
            <div className="bg3 borderR6 pa12 flexFull maB12 widthFull flexBS column">
              <div className="font14">
                6月生日冠名争夺战结束,恭喜粉丝为@时代少年团-贺峻霖解锁惊喜福利
              </div>
              <div className="flexB gray widthFull fontSmall">
                <span>8/23</span>
                <span>四川</span>
              </div>
            </div>
            <ul className="flexS widthFull">
              <li className="maR12 activeAvatar">
                <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7" />
              </li>
              <li className="maR12">
                <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.ofjm5a8hxRo_o7HYH3MxQgHaHX?w=202&h=200&c=7&r=0&o=5&pid=1.7" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
