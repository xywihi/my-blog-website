import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import styles from "./index.module.less";
let cc = 0;
let bb = 0;
let recordOut = [];
export default function CalculatorBox() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(0);
  const [record, setRecord] = useState([]);
  const [showValue, setShowValue] = useState("0");
  const [focus, setFocus] = useState(false);
  // 计算器
  useEffect(() => {
    // 监听K键
    document.addEventListener("keydown", (e) => {
      if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
        if (cc == "" || cc == "0") return;
        const { key } = e;
        let oldBB = bb;
        if (key == "+") {
          bb += Number(cc);
          if (oldBB) recordOut = [oldBB + "+" + cc + "=" + bb, ...recordOut];
        } else if (key == "-") {
          bb -= Number(cc);
          if (oldBB) recordOut = [oldBB + "-" + cc + "=" + bb, ...recordOut];
        } else if (key == "*") {
          bb *= Number(cc);
          if (oldBB) recordOut = [oldBB + "*" + cc + "=" + bb, ...recordOut];
        } else if (key == "/") {
          bb = (Number(bb) / Number(cc)).toFixed(2);
          // debugger;
          if (oldBB) recordOut = [oldBB + "/" + cc + "=" + bb, ...recordOut];
        }
        setInputValue("");
        // bb=bb?.toFixed(4)
        setResult(bb);
        setRecord(recordOut);
        cc = 0;
        console.log(recordOut);
      }
    });
    // 监听+键
    // document.addEventListener("keydown", (e) => {
    //   const { key } = e;
    //   if (key == "+") {
    //     setResult(inputValue + result);
    //   }
    // });
    // // 监听-键
    // document.addEventListener("keydown", (e) => {
    // })
  }, []);

  const handleCompute = (e) => {
    const { value } = e.target;
    //

    // // 匹配非数字
    // const reg2 = /\D+/g;
    // // 去除首尾非数字
    // const reg3 = /^\D*|\D*$/g;
    // const arr = value.match(reg).map((item) => {
    //   return Number(item);
    // });
    // const arr2 = value.match(reg2);
    // const arr3 = value.match(reg3);
    // let newArr = [];
    // // arr3.forEach(element => {
    // //   newArr=arr2.slice(arr2.indexOf(element),1);
    // // });
    // // console.log('arr',arr,reg2)
    // if (arr3.length < 3) {
    //   // debugger

    //   let test=(() => {
    //     if (result.length == arr.length) return pre;
    //     debugger
    //     switch (arr2[result.length]) {
    //       case "+":
    //         return pre + cur + arr[result.length+1];
    //       case "-":
    //         return pre + cur - arr[result.length+1];
    //       case "*":
    //         return pre + cur * arr[result.length+1];
    //       case "/":
    //         return pre + cur / +arr[result.length+1];
    //     }
    //   })();
    //   console.log("test", test);
    // }
    const reg = /(\d+(\.\d+)?)/g;
    // 在字符串为sad5.365sad中找出小数
    // const reg1 = /\d+|\.\d+/g;

    // 匹配数字
    // const reg2 = /\D+/g;
    // 去除首尾非数字
    const reg3 = /^\d|^\d\.\d*$/g;
    let result = value.match(reg);
    console.log("result", result, value);
    cc = result ? result[0] : "";
    console.log("cc", cc, result ? result[0] : "");
    setShowValue(cc);
    setInputValue(value);
  };
  const handleClearRecord = () => {
    setRecord([]);
    setResult(0);
    setShowValue(0);
    setInputValue("");
    cc = 0;
    bb = 0;
  };

  return (
    <div className={styles.calculatorBox}>
      <div className={styles.inputHandleBox}>
        <div className={`maB12 pa8 borderR12 border20 ${(showValue!="0" || focus) == 0 ? "border_gray" : "border_black"}`}>
          <input
            type="text"
            placeholder="0"
            onChange={handleCompute}
            value={inputValue}
            typeof="number"
            className="font16 opacity0"
            onFocus={() => {
              setFocus(true)
            }}
            onBlur={() => {
              setFocus(false)}}
          />
          <div className={`${styles.labelBox} flexS`}>
          {showValue != "0" && showValue}

            {focus ?
            <label
              className={
                `${styles.showValue_active} bg_black`
              }
            ></label>:
            result == 0 && showValue == "0" &&
            <span className="colorGray">
              0
            </span>
            }
            {(record.length > 0 || showValue !="0") && (
              <div className="cursor icon_hover maL6" onClick={handleClearRecord}>
                <IonIcon icon={closeCircle} size="36px"></IonIcon>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {
        record.length == 0 && 
        <p className="fontSmall gray maT6">暂无计算记录</p>
      }
      <ul className="scrollbarBox">
        {record.map((item, index) => {
          return (
            <li key={index + 1} className={`font14 maV12 gray ${!index && 'colorBlack'}`}>
              {item}
            </li>
          );
        })}
      </ul>
      <div className={styles.resultBox}>
        <p className={`${result == 0 ? "colorGray" : "colorBlack"} fontB font24`}>{Number(result).toFixed(2)}</p>
        <p className="fontSmall gray maT6">此计算器仅做加减乘除运算</p>
      </div>
    </div>
  );
}
