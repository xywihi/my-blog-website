import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.less";

export default function LineBox({
  data = { max: 6000, min: 0, lineData: [] },
}) {
  const [linBoxStyles, setLinBoxStyles] = useState({ width: 0, height: 0 });
  const ref = useRef();
  useEffect(() => {
    const lineBoxDom = document.getElementById("lineBox");
    const styles = window.getComputedStyle(lineBoxDom);
    const { width, height } = styles;

    setLinBoxStyles((old) => {
      const maxValue = Math.max(...data?.lineData);
      let upperLimit =
        (Math.ceil(maxValue / 10 ** (maxValue.toString().length - 1)) + 1) *
        10 ** (maxValue.toString().length - 1);
      const lineData = data.lineData?.reduce((pre, cur, index) => {
        return (
          pre +
          ` L ${(width.split("px")[0] / 24) * (index + 1)} ${
            height.split("px")[0] * (1 - cur / (upperLimit - data.min))
          }`
        );
      }, `M 0 ${height.split("px")[0]}`);
      return {
        width: width.split("px")[0],
        height: height.split("px")[0],
        lineData,
        maxValue,
        upperLimit,
      };
    });
  }, []);

  const handleSeaEveryOne = (e) => {
    var x = e.clientX;
    var y = e.clientY;
    // 获取移动的位置信息
    const lineSvg = document.getElementById("lineSvg");
    var svgRect = lineSvg.getBoundingClientRect();
    var offsetX = x - svgRect.left;
    var offsetY = y - svgRect.top;
    // // 创建line元素
    var line = (
      <>
        <line
          x1="0"
          y1={offsetY}
          x2="100%"
          y2={offsetY}
          stroke="red"
          strokeOpacity="1.000000"
          strokeWidth="1.000000"
          strokeDasharray="2.000000,2.000000"
        />
        <text x={linBoxStyles.width - 32} y="14" fill="#D4D4D4" fontSize={14}>
          {Math.ceil(
            (1 - offsetY / linBoxStyles.height).toFixed(2) *
              (linBoxStyles.upperLimit - data.min)
          )}
        </text>
      </>
    );
    setLinBoxStyles({ ...linBoxStyles, line });
  };
  return (
    <div className={styles.lineBox} id="lineBox">
      <div className={styles.downLineBpx}>
        <svg
          id="lineSvg"
          width={linBoxStyles.width}
          height={linBoxStyles.height}
          viewBox={`0 0 100% ${linBoxStyles.height}`}
          fill="none"
          // fill="url(#gradient)"
          xmlns="http://www.w3.org/2000/svg"
          // onMouseOver={
          //   handleSeaEveryOne
          // }
          onMouseMove={handleSeaEveryOne}
          onMouseLeave={() => {
            setLinBoxStyles({ ...linBoxStyles, line: null });
          }}
        >
          <desc>down line</desc>
          <defs/>
          <line
            x1="0"
            y1="100%"
            x2={linBoxStyles.width}
            y2="100%"
            stroke="#D4D4D4"
            strokeOpacity="1.000000"
            strokeWidth="1.000000"
          />
          <line
            x1={linBoxStyles.width}
            y1="50%"
            x2="0.000000"
            y2="50%"
            stroke="#D4D4D4"
            strokeOpacity="1.000000"
            strokeWidth="1.000000"
            strokeDasharray="2.000000,2.000000"
          />
          <line
            x1={linBoxStyles.width}
            y1="0"
            x2="0.000000"
            y2="0"
            stroke="#D4D4D4"
            strokeOpacity="1.000000"
            strokeWidth="1.000000"
            strokeDasharray="2.000000,2.000000"
          />
          <line
            x1={linBoxStyles.width}
            y1={
              (1 -
                linBoxStyles.maxValue / (linBoxStyles.upperLimit - data.min)) *
              linBoxStyles.height
            }
            x2="36"
            y2={
              (1 -
                linBoxStyles.maxValue / (linBoxStyles.upperLimit - data.min)) *
              linBoxStyles.height
            }
            stroke="#46f0d3"
            strokeOpacity="1.000000"
            strokeWidth="1.000000"
            strokeDasharray="2.000000,2.000000"
          />
          <text
            x="0"
            y={linBoxStyles.height / 2 + 14}
            fill="#D4D4D4"
            fontSize={14}
          >
            +{(linBoxStyles.upperLimit + data.min) / 2}
          </text>
          <text x="0" y="14" fill="#333333" fontSize={14}>
            +{linBoxStyles.upperLimit}
          </text>
          <text
            x="0"
            y={
              (1 -
                linBoxStyles.maxValue / (linBoxStyles.upperLimit - data.min)) *
                linBoxStyles.height +
              4
            }
            fill="#46f0d3"
            fontSize={14}
          >
            {linBoxStyles.maxValue}
          </text>
          {Array(11)
            .fill("")
            .map((item, index) => {
              return (
                <rect
                  key={index}
                  id={"vvv" + index}
                  x={(linBoxStyles.width / 12) * (index + 1)}
                  y={
                    index == 5
                      ? linBoxStyles.height - 6
                      : linBoxStyles.height - 3
                  }
                  width="3.074982"
                  height={index == 5 ? "6" : "3"}
                  fill={index == 5 ? "#D4D4D4" : "#D4D4D4"}
                  fillOpacity="1.000000"
                />
              );
            })}

          {/* 走势折线 */}
          <path
            d={linBoxStyles.lineData}
            fill="none"
            stroke="#11BF77"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {linBoxStyles.line}
        </svg>
      </div>
    </div>
  );
}
