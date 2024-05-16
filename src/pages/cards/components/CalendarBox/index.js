import React, { useEffect, useState, useMemo, useCallback } from "react";
import { IonIcon } from "@ionic/react";
import { caretBack, caretForward } from "ionicons/icons";
import styles from "./index.module.less";
import { connect } from "react-redux";
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

function CalendarBox({ cardSize, plans,...props }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentWeekDay = useMemo(
    () => currentDate.getMonth() + 1 === new Date().getMonth() + 1,
    [currentDate]
  );
  useEffect(() => {
    // currentDate.getweekDay() === 0 && setCurrentDate(new Date());
  }, []);
  useEffect(() => {
    // new Date().getMonth() === currentDate.getMonth()+1 &&
    if (currentWeekDay) {
      setCurrentDate(new Date());
    }
  }, [currentWeekDay]);
  // 列出星期的英文缩写

  const getWeakIndex = (str) => {
    switch (str) {
      case "Mon":
        return 1;
      case "Tue":
        return 2;
      case "Wed":
        return 3;
      case "Thu":
        return 4;
      case "Fri":
        return 5;
      case "Sat":
        return 6;
      case "Sun":
        return 7;
      default:
        break;
    }
  };

  const handleChangeMonth = (type) => {
    if (type === "prev") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
    } else {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    }
  };
  const getMonthDays = useCallback(
    (currentDate, type) => {
      if (type === "days") {
        return new Date(
          currentDate?.getFullYear(),
          currentDate?.getMonth() + 1,
          0
        ).getDate();
      } else {
        return new Date(
          currentDate?.getFullYear(),
          currentDate?.getMonth(),
          1
        ).getDay();
      }
    },
    [currentDate]
  );
  const checkExitPlan = useCallback(
    (date) => {
      if(date>0){
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date).getTime();
        const plan = plans.find((item) => {
          return newDate<=item.startTime &&  item.startTime<= newDate+86400000;
        });
        // debugger;
        return plan;
      }
      return false;
    },
    [plans]
  );
  return (
    <>
      {cardSize === "large" ? (
        <div className={styles.calendarBox_large}>
          <ul className={`${styles.weekDayBox} fontSmall fontB`}>
            {weekDays.map((item, index) => (
              <li key={index + 1} className={styles.weekDay}>
                {item}
              </li>
            ))}
          </ul>
          <ul className={`${styles.daysBox} font16`}>
            {Array(
              getMonthDays(currentDate, "days") +
                getMonthDays(currentDate, "week")
            )
              .fill(1)
              .map((item, index) => (
                <li key={index + 1} className={styles.dayBox}>
                  <span
                    className={
                      currentDate.getDate() === index - currentDate.getDay()+1 &&
                      currentWeekDay
                        ? "black font16 fontB"
                        : "gray fontSmall"
                    }
                  >
                    {index - getMonthDays(currentDate, "week") + 1 > 0
                      ? index - getMonthDays(currentDate, "week") + 1
                      : ""}
                  </span>
                  {currentDate.getDate() === index - currentDate.getDay()+1 &&
                    currentWeekDay && (
                      <span className={`${styles.dayCircle} bg3`}></span>
                    )}
                  {checkExitPlan(index - getMonthDays(currentDate, "week") + 1) && (
                    <span
                      className={`${styles.exitPlan} ${
                        checkExitPlan(index - getMonthDays(currentDate, "week") + 1).status === 2
                          ? "bg_blue"
                          : checkExitPlan(index - getMonthDays(currentDate, "week") + 1).status === 1
                          ? "bg_orange"
                          : "bg_gray"
                      }`}
                    ></span>
                  )}
                </li>
              ))}
          </ul>
          <div className={`flexB widthFull ${styles.currentMouth}`}>
            <p className={`font24 fontB gray`}>
              {/* 2022年11月 */}
              {currentDate.getMonth() + 1}月{currentDate.getDate()}
            </p>
            <div className={`flexB ${styles.bottomIcons}`}>
              <div
                className="cursor icon_hover icon"
                onClick={() => handleChangeMonth("prev")}
              >
                <IonIcon icon={caretBack} size="36px"></IonIcon>
              </div>
              <div
                className="cursor icon_hover icon"
                onClick={() => handleChangeMonth("next")}
              >
                <IonIcon icon={caretForward} size="36px"></IonIcon>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calendarBox_small}></div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  plans: state.reducer.plans,
});

export default connect(mapStateToProps, null)(CalendarBox);
