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

export default function PersonalAvatar({ cardSize }) {
  useEffect(() => {
    
  }, []);
  return cardSize === "big" ? (
    <div className={styles.personalAvatar_big_box}>
        <img
          alt="Silhouette of a person's head"
          src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7"
        />
        <div className="maH12">
          <h4 className="fontB">Anln</h4>
          <span className="fontSmall">疯狂努力拼搏中...</span>
        </div>
      </div>
  ) : cardSize === "middle" ? (
    <div className={`${styles.personalAvatar_middle_box} flexB`}>
      <img
          alt="Silhouette of a person's head"
          src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7"
        />
        <div className="maH12 maL24">
          <h4 className="fontB">Anln</h4>
          <span className="fontSmall">疯狂努力拼搏中...</span>
        </div>
    </div>
  ) : (
    <div
        className={`${styles.personalAvatar_small_box}`}
      >
        <img
          alt="Silhouette of a person's head"
          src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7"
        />
        {/* <div className="maH12 maT12">
          <h4 className="fontB">Anln</h4>
        </div> */}
      </div>
  );
}
