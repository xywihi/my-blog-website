import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { play, pause, trash } from "ionicons/icons";
import styles from "./index.module.less";
import { handleTime } from "@/util";
let timer = null;
export default function TimerBox(props) {
  const [time, setTimer] = useState(0);
  const [toPuase, setToPuase] = useState(true);
  useEffect(() => {
    console.log('draggable',props)
    // debugger
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleStartTime = () => {
    timer = setTimeout(() => {
      setTimer((old) => {
        handleStartTime();
        return old + 1;
      });
    }, 1000);
  };
  const startTime = () => {
    setToPuase((old) => {
      // 开始计时
      if (old) {
        handleStartTime();
      } else {
        clearTimeout(timer);
      }
      return !old;
    });
  };
  const resetTime = () => {
    setTimer(0);
    clearTimeout(timer);
    setToPuase(true);
  };
  return (
    <div className={`${styles.timerBox} heightFull`} >
      <p className={`fontB ${time ? 'colorBlack' : 'colorGray'}`}>{handleTime(time)}</p>
      {!toPuase ? (
        <div className="cursor icon_hover icon maT3" onClick={startTime}>
          <IonIcon icon={pause} size="36px"></IonIcon>
        </div>
      ) : (
        <div>
          <div className="cursor icon_hover icon maT3" onClick={startTime}>
            <IonIcon icon={play} size="36px"></IonIcon>
          </div>
          {time ? (
            <div className="cursor icon_hover icon maT3" onClick={resetTime}>
              <IonIcon icon={trash} size="36px"></IonIcon>
            </div>
          ):null}
        </div>
      )}
    </div>
  );
}
