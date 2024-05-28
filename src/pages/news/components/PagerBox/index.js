import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import { chevronUp, chevronDown } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { debounce } from "@/util";
import { connect } from "react-redux";

function PagerBox({ pagerInfo, dataLength = 1 }) {
  const [pageScroll, setPageScroll] = useState(false);
  const [currentDomToTop, setCurrentDomToTop] = useState(0);

  useEffect(() => {
    document
      .getElementById("contentBoxId")
      .addEventListener("scroll", function () {
        console.log("scrollTop", this.scrollTop);
        console.log("clientHeight", this.clientHeight);
        console.log("scrollHeight", this.scrollHeight);

        function test() {
          let step = Math.floor(
            this.scrollTop /
              ((this.scrollHeight - this.clientHeight) / dataLength)
          );
          setCurrentDomToTop(
            this.scrollTop == this.scrollHeight - this.clientHeight
              ? dataLength - 1
              : step
          );
        }
        debounce(test.call(this), 10);
      });
  }, [dataLength]);
  useEffect(() => {
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  const handleTrop = (type) => {
    let moveDom = document.getElementById(
      `newsItem${
        currentDomToTop +
        (type == "top"
          ? !currentDomToTop
            ? 0
            : -1
          : !currentDomToTop == dataLength - 1
          ? 0
          : 1)
      }`
    );

    switch (type) {
      case "top":
        // currentDomToTop && setCurrentDomToTop(currentDomToTop - 1);
        (currentDomToTop || currentDomToTop == 0) &&
          moveDom.scrollIntoView({ behavior: "smooth", block: "end" });
        break;
      case "down":
        currentDomToTop < dataLength - 1 &&
          // setCurrentDomToTop(currentDomToTop + 1);
          currentDomToTop < dataLength - 1 &&
          moveDom.scrollIntoView({ behavior: "smooth", block: "center" });
        break;

      default:
        break;
    }
  };

  return (
    <div className={`${styles.pagerBox}`}>
      <ul>
        <li onClick={() => handleTrop("top")}>
          <div
            className={`${styles.createNewBtn} cursor icon_hover ${
              !currentDomToTop ? "colorGrayLighter" : "gray"
            }`}
          >
            <IonIcon icon={chevronUp}></IonIcon>
          </div>
        </li>
        {Array.from(
          {
            length:
              pagerInfo.pageSize > dataLength ? dataLength : pagerInfo.pageSize,
          },
          (_, index) => (
            <li
              key={index}
              className={
                index == currentDomToTop
                  ? `bg_blue ${styles.active_circle_pointer}`
                  : `bg4 ${styles.circle_pointer}`
              }
            ></li>
          )
        )}
        <li className={styles.currentNumBox}>
          {pagerInfo.pageSize * (pagerInfo.page - 1) + currentDomToTop  + 1}
        </li>
        <li onClick={() => handleTrop("down")}>
          <div
            className={`${styles.createNewBtn} cursor icon_hover ${
              currentDomToTop < pagerInfo.pageSize - 1 &&
              pagerInfo.pageSize * (pagerInfo.page - 1) + currentDomToTop <
                pagerInfo.total - 1
                ? "gray"
                : "colorGrayLighter"
            }`}
          >
            <IonIcon icon={chevronDown} size="12px"></IonIcon>
          </div>
        </li>
      </ul>
    </div>
  ); // eslint-disable-line
}

const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(PagerBox);
