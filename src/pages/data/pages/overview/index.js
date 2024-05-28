import React from "react";
import styles from "./index.module.less";
import TotalNumberBox from "./components/TotalNumberBox";
import IncomeBox from "./components/IncomeBox";
import MapBox from "./components/MapBox";
import RealTimeBox from "./components/RealTimeBox";
import HeathyBox from "./components/HeathyBox";
import NewsBox from "./components/NewsBox";
import CustomersBox from "./components/CustomersBox";
import YoYBox from "./components/YoYBox";
import { IonIcon } from "@ionic/react";

import fenxi from "../../icons/fenxi.svg";
import custorms from "../../icons/custorms.svg";
import location from "../../icons/location.svg";
import news from "../../icons/news.svg";
import realtime from "../../icons/realtime.svg";
import total from "../../icons/total.svg";
import dairy from "../../icons/dairy.svg";

export default function Overview() {
  const incomeData = [
    {
      total: "124.50",
      symbol: "-",
      YoY: "0.2%",
      date: "01-01",
    },
    {
      total: "304.25",
      symbol: "+",
      YoY: "12.56%",
      date: "01-01",
    },
    {
      total: "264.00",
      symbol: "+",
      YoY: "12.56%",
      date: "01-01",
    },
    {
      total: "196.20",
      symbol: "-",
      YoY: "12.56%",
      date: "01-01",
    },
    {
      total: "324.10",
      symbol: "+",
      YoY: "12.56%",
      date: "01-01",
    },
    {
      total: "304.26",
      symbol: "+",
      YoY: "12.56%",
      date: "01-01",
    },
    {
      total: "304.26",
      symbol: "+",
      YoY: "12.56%",
      date: "01-01",
    },
    {
      total: "304.26",
      symbol: "+",
      YoY: "12.56%",
      date: "01-01",
    },
    {
      total: "304.26",
      symbol: "+",
      YoY: "12.56%",
      date: "01-01",
    },
    {
      total: "304.26",
      symbol: "+",
      YoY: "12.56%",
      date: "01-01",
    },
    {
      total: "304.26",
      symbol: "+",
      YoY: "12.56%",
      date: "01-01",
    },
  ];
  const realTimeData = {
    min: 0,
    lineData: [
      240, 420, 321, 560, 1586, 865, 348, 1654, 2584, 2156, 1586, 1458, 986,
      754, 358, 865, 756, 548, 354, 574, 158, 102, 86,
    ],
  };
  
  return (
    <div className={`${styles.overviewBox}`}>
      {/* 左右布局 */}
      <div className={styles.topBox}>
        <div className={styles.topLeftBox}>
          <div>
            <div className="flexB">
              <p className="maB12 flexS">
                <div className="font20 maR12 lineFull">
                  <IonIcon icon={total}></IonIcon>
                </div>
                <span className="fontB">数据总计</span>
              </p>

              <div className={`paH12 paV3 borderR50 bg_yellow_lightest fontSmall colorYellow2 maB12 ${styles.noticeBox}`}>
                通知：版本即将在三天后更新，日期为2024-05-28
              </div>
            </div>
            <div className={styles.totalNumbersBox}>
              <TotalNumberBox
                data={{
                  total: "100",
                  symbol: "+",
                  offset: 319,
                  unit: "次",
                  type: "访问量",
                }}
              />
              <TotalNumberBox
                data={{
                  total: "100",
                  symbol: "-",
                  offset: 33,
                  unit: "个",
                  type: "粉丝数量",
                }}
              />
              <TotalNumberBox
                data={{ total: "215", unit: "次", type: "文章数量" }}
              />
              <TotalNumberBox
                data={{
                  total: "1000.00",
                  symbol: "+",
                  offset: 1203,
                  unit: "元",
                  type: "总收入",
                }}
              />
            </div>
          </div>
          <div className={styles.leftCenterBox}>
            {/* 实时数据 */}
            <div>
              <p className="maB12 flexS">
                <div className="font20 maR12 lineFull">
                  <IonIcon icon={realtime}></IonIcon>
                </div>
                <span className="fontB">实时数据</span>
              </p>
              <RealTimeBox data={realTimeData} />
            </div>
            <div>
              <p className="maB12 flexS">
                <div className="font20 maR12 lineFull">
                  <IonIcon icon={fenxi}></IonIcon>
                </div>
                <span className="fontB">综合分析</span>
              </p>
              <div className={styles.leftCenterRightBox}>
                <HeathyBox data={80}/>
                <YoYBox data={{ one: 81, two: 86, three: 62, four: 11 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="heightFull">
          <p className="maB12 flexS">
            <div className="font20 maR12 lineFull">
              <IonIcon icon={dairy}></IonIcon>
            </div>
            <span className="fontB">每日收入</span>
          </p>
          <IncomeBox data={incomeData} />
        </div>
      </div>
      {/* 每日收入 */}
      <div className={styles.leftBottomBox}>
        <div className={styles.leftBottomLeftBox}>
          <div>
            <p className="maB12 flexS">
              <div className="font20 maR12 lineFull">
                <IonIcon icon={news}></IonIcon>
              </div>
              <span className="fontB">最新资讯</span>
            </p>
            <NewsBox />
          </div>
          <div>
            <p className="maB12 flexS">
              <div className="font20 maR12 lineFull">
                <IonIcon icon={custorms}></IonIcon>
              </div>
              <span className="fontB">优质客户</span>
            </p>
            <CustomersBox />
          </div>
        </div>
        <div>
          <p className="maB12 flexS">
            <div className="font20 maR12 lineFull">
              <IonIcon icon={location}></IonIcon>
            </div>
            <span className="fontB">位置跟踪</span>
          </p>
          <MapBox />
        </div>
      </div>
    </div>
  );
}
