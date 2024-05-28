import React, { useEffect } from "react";
import styles from "./index.module.less";
import Image from "@/components/Image";
export default function NewsBox({ data }) {
  useEffect(() => {
  }, [data]);
  return (
    <div className={`${styles.newsBox} bg2 borderR12 flexB`}>
      <div className={`${styles.bannerBox} bg1`}>
        <div>
          <Image src="https://images.unsplash.com/photo-1599272585578-03bfc70032b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" width="100%"  height="100%"/>
        </div>
        <div className="paH24 paV12">
          <h2 className="fontB">
          追寻自由：海洋、山...
          </h2>
          <p>
            今天是我人生中难以忘怀的日子，充满了无数美好的回忆。我们..
          </p>
        </div>
      </div>
      <div className="pa24 heightFull">
        <ul className="column heightFull scrollbarBox">
          <li className="bg3 pa12 borderR12 maB12">
          追寻自由：海洋、山川与初雪...
          </li>
          <li className="bg3 pa12 borderR12 maB12">
          忙碌中的宁静瞬间
          </li>
          <li className="bg3 pa12 borderR12 maB12">
          Go中net/http的状态码有哪些
          </li>
          <li className="bg3 pa12 borderR12 maB12">
          追寻自由：海洋、山川与初雪...
          </li>
          <li className="bg3 pa12 borderR12 maB12">
          追寻自由：海洋、山川与初雪...
          </li>
          <li className="bg3 pa12 borderR12 maB12">
          忙碌中的宁静瞬间
          </li>
          <li className="bg3 pa12 borderR12 maB12">
          Go中net/http的状态码有哪些
          </li>
          <li className="bg3 pa12 borderR12 maB12">
          追寻自由：海洋、山川与初雪...
          </li>
        </ul>
      </div>
    </div>
  );
}
