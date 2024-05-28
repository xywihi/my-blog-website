import React, { useEffect } from "react";
import styles from "./index.module.less";
export default function IncomeBox({ data }) {
  useEffect(() => {
  }, [data]);
  return (
    <div className={`${styles.incomeBox} bg1 borderR12 pa24 flexB `}>
      <div className="scrollbarBox scrollbarBox_hidden widthFull">
      <ul>
        {data.map((item, index) => <li key={index} className={`flexB maB24 ${styles.itemBox} ${!index ? " bg_greenLighter borderR6 pa12 ":""}`}>
            <div>
              <span className={`maR24 fontSmall ${
              item.symbol == "+" ? "colorRed" : "colorGreen"
            }`}>{item.symbol}</span>
              <span className={!index ? "font24 fontB" : ""}>{item.total}</span>
            </div>
            <div>
              <div className="maB12">{item.date}</div>
              {!index && (
                <div className={`${item.symbol == "+" ? "bg_red" : "bg_green"} paH12 paV3 borderR6 colorWhite flexB`}>
                  <span>{item.symbol}</span>
                  <span>{item.YoY}</span>
                </div>
              )}
            </div>
          </li>)}
      </ul>
      </div>
    </div>
  );
}
