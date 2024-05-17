import React, { useEffect, useState } from "react";

import styles from "./index.module.less";
import { IonIcon } from "@ionic/react";
import { colorWand } from "ionicons/icons";
export default function CardCreator({
  key,
  wNum,
  hNum,
  minWNum,
  minHNum,
  title,
  tIcon,
  padding = 0,
  paddingD = 0,
  unitWidth,
  children,
  background = true,
  change = null,
  // backgroundImage = "",
  dragStart,
  attributes,
  gridsArr,
  changHeight,
  cardsArrFinal,
  ...props
}) {
  const [activeChange, setActiveChange] = useState(false);
  useEffect(() => {
    // children.props.draggable=false
    // debugger
    // if(props.name=='calendarBox'){
    //   debugger
    // }
    // debugger;
  }, []);
  const changeHeight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (changHeight) {
      changHeight(e, wNum, hNum, attributes, gridsArr, cardsArrFinal);
    }
  };
  return (
    <div
      draggable={dragStart && !activeChange}
      onDragStart={(e) => {
        // e.preventDefault();
        // e.stopPropagation();
        if (dragStart && !change) {
          dragStart(e, attributes, gridsArr, cardsArrFinal);
        }
      }}
      className={`borderR12 maB12 cardBox cardBoxShadow heightFull ${
        styles.cardCreator
      } ${background ? "bg1" : ""}`}
      style={{
        padding: `${
          padding
            ? padding + "px"
            : paddingD
            ? `${paddingD.v}px ${paddingD.h}px`
            : 0
        }`,
        height: `${hNum * unitWidth - 12}px`,
        width: `${wNum * unitWidth - 12}px`,
        minHeight: `${minHNum * unitWidth - 12}px`,
        minWidth: `${minWNum * unitWidth - 12}px`,
      }}
    >
      {title && (
        <div className="maB12 flexB">
          <p className="font18 fontB">{title}</p>
          <div className="cursor icon_hover icon">
            <IonIcon icon={tIcon} size="36px"></IonIcon>
          </div>
        </div>
      )}
      {change && (
        <div className={`${styles.rightTopBox} bg_blue`} onClick={()=>setActiveChange(!activeChange)}>
          <div className="cursor icon_hover icon">
            <IonIcon icon={colorWand} size="36px"></IonIcon>
          </div>
        </div>
      )}

      {typeof children === "function"
        ? children({ wNum, hNum, unitWidth, ...props })
        : React.createElement(children, {wNum, hNum, ...props })}
      {activeChange && (
        <div className={`${styles.changeWHBox} bg3`}>
          {
            change.v && <div
            className={`${styles.changeHeight} bg_gray`}
            draggable={true}
            onDrag={changeHeight}
          ></div>
          }
          {
            change.h && <div
            className={`${styles.changeWidth} bg_gray`}
            draggable={true}
            onDrag={changeHeight}
          ></div>
          }
          
        </div>
      )}
    </div>
  );
}
