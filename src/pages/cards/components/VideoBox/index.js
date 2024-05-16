import React, { useEffect } from "react";

import styles from "./index.module.less";

export default function VideoBox() {
  useEffect(() => {
  }, []);
  return (
    <>
      <div className={styles.videoBox}>
        <video
          src="https://cdn.pixabay.com/video/2024/03/08/203449-921267347_large.mp4"
          controls
        ></video> 
      </div>
    </>
  );
}
