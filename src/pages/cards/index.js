import React, { useEffect, useState, createRef, Children } from "react";
import "./styles.less";
import styles from "./index.module.less";
import { IonIcon } from "@ionic/react";
import { menu, language } from "ionicons/icons";

import ExamCountdown from "./components/examCountdown";
import TimeWeather from "./components/timeWeather";
import MusicPlayer from "../../components/musicPlayer";
import Translate from "../../components/translate";
import SmoothedLine from "../../components/echarts/smoothedLine";
import { connect } from "react-redux";
import ChatAi from "../../components/chatAi";
import HttpRequire from "../../http/require";
import { showStatusBox } from "@/store/actions";
import Banner from "./components/Banner";

import { computeOrder, computeCardsOrder } from "./tool";
const banners = [
  {
    url: "https://images.unsplash.com/photo-1599272585578-03bfc70032b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "平淡人生，浮躁心态",
    subtitle: "平淡人生，浮躁心态，梦想的美好是建立在残酷的现实之上。",
    time: "2023/09/01",
    id: 0,
  },
];
const windowW = window.innerWidth - 352;
let gridsArr = [];
const cardsArr = [
  {
    id: 0,
    attributes: {
      xyArr: [
        [0, 0],
        [1, 0],
      ],
      symbol: Symbol("card1"),
    },
    styles: {
      width: `${(windowW / 20) * 6}px`,
      height: `${(windowW / 20) * 4}px`,
      left: `0px`,
      top: `0px`,
    },
    component: <Banner wNum={6} hNum={4} unitWidth={windowW / 20} />,
  },
];
const createGrids = (xCount, yCount) => {
  // console.log("createGrids", cardsArr);
  let newGrids = Array.from({ length: xCount * yCount }, (_, index) => ({
    x: (index % xCount) * (windowW / xCount),
    y: Math.floor(index / xCount) * (windowW / xCount),
    used: false,
    symbol: null,
    position: [0, 0],
    height: 0,
    width: 0,
  }));
  let compNewGrids = newGrids.map((item, index) => {
    cardsArr.forEach((card, cardIndex) => {
      card.attributes.xyArr.forEach((xy, xyIndex) => {
        if (
          (xy[0] * windowW) / xCount === item.x &&
          (xy[1] * windowW) / xCount === item.y
        ) {
          item.symbol = card.attributes.symbol;
          item.position = [item.x, item.y];
          item.used = true;
        }
      });
    });
    return item;
  });
  // console.log("grids", compNewGrids);
  gridsArr = compNewGrids;
  return compNewGrids;
};
const Cards = ({ showStatusBox }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("zh");
  const [wallImage, setWallImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [_, setGridsArr] = useState([]);
  const [cardsArrTest, setCardsArr] = useState([]);

  // console.log("windowW", windowW);
  const childTranslate = createRef(null);
  let vvvvvv = [];
  useEffect(() => {
    const arr = [
      [2, 2],
      [6, 4],
      [3, 3],
      [2, 1],
      [8, 6],
      [4, 6],
      [4, 4],
    ];
    // computeOrder(arr)
    vvvvvv = computeCardsOrder(arr, windowW, 20, 10).map((item, index) => {
      item.component = <div><div></div></div>;
      item.styles.left = `${
        ((item.attributes.xyArr?.[0]?.[0] || 0) * windowW) / 20 }px`;
      item.styles.top = `${
        ((item.attributes.xyArr?.[0]?.[1] || 0) * windowW) / 20 }px`;
      
      return item;
    });
    setCardsArr(vvvvvv);
    setGridsArr(createGrids(20, 10));
  }, []);

  // 获取随机颜色
  const randomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  //   console.log("cards_page");

  const handleStartDrag = (e, attributes) => {
    // 获取元素带有的属性
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    // console.log("handleStartDrag", typeof e.target.getAttribute("attributes"));
    let position = [0, 0];
    // 获取父级元素
    const parent = e.target.parentNode;
    const currentEleStyle = e.target.getBoundingClientRect();
    const parentEleStyle = e.target.parentNode.getBoundingClientRect();
    // console.log(
    //   currentEleStyle.left - parentEleStyle.left,
    //   currentEleStyle.top - parentEleStyle.top
    // );
    gridsArr.some((item, index) => {
      let isOwn =
        item.symbol &&
        currentEleStyle.left - parentEleStyle.left === item.position[0] &&
        currentEleStyle.top - parentEleStyle.top === item.position[1];
      if (isOwn) {
        position = item.position;
      }
      return isOwn;
    });
    // 设置拖拽元素的初始位置
    const initialX = e.clientX;
    const initialY = e.clientY;
    const card = e.target;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    let compLeft = 0;
    let compTop = 0;

    // // 将克隆元素添加到body中
    // document.body.appendChild(clone);
    const clone = card.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.backgroundColor = `#cccccc80`;
    clone.style.transition = `none`;
    clone.style.opacity = `.2`;
    document.getElementById("cardsArea").appendChild(clone);
    // 监听鼠标移动事件
    document.addEventListener("mousemove", handleDrag);
    // 监听鼠标松开事件
    document.addEventListener("mouseup", handleDrop);

    function handleDrag(e) {
      // 计算拖拽元素的新位置
      const newX = e.clientX - initialX + position[0];
      const newY = e.clientY - initialY + position[1];
      compLeft =
        newX < 0 ? 0 : newX > windowW - cardWidth ? windowW - cardWidth : newX;

      compTop =
        newY < 0
          ? 0
          : newY > (windowW / 20) * 10 - cardHeight
          ? (windowW / 20) * 10 - cardHeight
          : newY;
      // console.log("compLeft", compLeft);
      card.style.left = `${compLeft}px`;
      card.style.top = `${compTop}px`;

      //克隆card

      const newLeft =
        Math.floor((compLeft + cardWidth / 2) / cardWidth) * cardWidth;
      const newTop =
        Math.floor((compTop + cardWidth / 2) / cardWidth) * cardWidth;

      clone.style.width = `${cardWidth + 20}px`;
      clone.style.height = `${cardHeight + 20}px`;
      clone.style.left = `${newLeft - 10}px`;
      clone.style.top = `${newTop - 10}px`;
      // 将克隆元素添加到body中
    }

    function handleDrop() {
      // 移除克隆元素
      // clone.remove();
      // 移除事件监听器
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDrop);
      // 恢复拖拽元素的样式
      // card.style.zIndex = "";
      const newLeft =
        Math.floor((compLeft + cardWidth / 2) / cardWidth) * cardWidth;
      const newTop =
        Math.floor((compTop + cardWidth / 2) / cardWidth) * cardWidth;
      card.style.left = newLeft + "px";
      card.style.top = newTop + "px";
      // card.style.width = "";
      // card.style.height = "";
      handleMoveToNewSite(
        newLeft,
        newTop,
        cardWidth,
        cardHeight,
        currentEleStyle,
        parentEleStyle,
        card,
        attributes
      );
      //   移除克隆元素
      clone.remove();
    }
  };
  //   检查是否被覆盖
  const handleCheckOver = (
    newLeft,
    newTop,
    currentEleOldStyle,
    parentEleStyle
  ) => {
    // console.log("handleCheckOver", currentEleOldStyle, parentEleStyle);
    if (
      currentEleOldStyle.left - parentEleStyle.left === newLeft &&
      currentEleOldStyle.top - parentEleStyle.top === newTop
    ) {
      return;
    }
    const usedArea = [];
    gridsArr.forEach((grid) => {
      if (grid.used) {
        let firstArea = usedArea.some((area) => {
          return area.symbol === grid.symbol;
        });
        if (firstArea) return;
        usedArea.push({
          TLRBLR: [grid.x, grid.y, grid.x + grid.width, grid.y + grid.height],
          symbol: grid.symbol,
        });
      }
    });
    // console.log("usedArea", gridsArr, usedArea);
    // debugger;
    return usedArea.some((area) => {
      if (
        newLeft >= area.TLRBLR[0] &&
        newLeft <= area.TLRBLR[2] &&
        newTop >= area.TLRBLR[1] &&
        newTop <= area.TLRBLR[3]
      ) {
        return true;
      }
    });
  };
  const handleMoveToNewSite = (
    newLeft,
    newTop,
    cardWidth,
    cardHeight,
    currentEleOldStyle,
    parentEleStyle,
    card,
    attributes
  ) => {
    // 检查是否碰撞到其他卡片
    if (handleCheckOver(newLeft, newTop, currentEleOldStyle, parentEleStyle)) {
      card.style.left = currentEleOldStyle.left - parentEleStyle.left + "px";
      card.style.top = currentEleOldStyle.top - parentEleStyle.top + "px";
      // card.style.transition='all .5s ease-in-out'
      showStatusBox({
        show: true,
        // message:"网络异常，请稍后再试",
        message: "卡片不能被覆盖",
        status: "warning",
      });
      return;
    }
    const symbol = Symbol();
    const topLeftPoint = [newLeft, newTop];
    const topRightPoint = [newLeft + cardWidth, newTop];
    const bottomLeftPoint = [newTop + cardHeight, newLeft];
    const bottomRightPoint = [newTop + cardHeight, newLeft + cardWidth];
    // debugger;
    // console.log(card.style.left, card.style.top);
    // console.log("card,card", cardsArr[0].attributes.symbol==attributes.symbol,attributes.symbol==gridsArr[0].symbol);
    const grids = gridsArr.map((grid) => {
      let overed =
        grid.x >= newLeft &&
        grid.x < newLeft + cardWidth &&
        grid.y >= newTop &&
        grid.y < newTop + cardHeight;
      return {
        ...grid,
        used: overed
          ? true
          : grid.used
          ? attributes?.symbol === grid.symbol
            ? false
            : true
          : grid.used,
        symbol: overed
          ? attributes?.symbol
          : currentEleOldStyle.left - parentEleStyle.left ===
              grid.position[0] &&
            currentEleOldStyle.top - parentEleStyle.top === grid.position[1]
          ? null
          : grid.symbol,
        // symbol: attributes?.symbol === grid.symbol ? null : used ? (grid.used ? grid.symbol : attributes?.symbol) : grid.symbol,
        position: grid.used
          ? grid.position
          : overed
          ? [newLeft, newTop]
          : [0, 0],
        width: grid.used ? grid.width : overed ? cardWidth : 0,
        height: grid.used ? grid.height : overed ? cardHeight : 0,
      };
    });
    // console.log("grids", grids);
    // setGridsArr(grids);
    gridsArr = grids;
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="bg2_blue flexS flexWrap" id="cardsArea">
        {gridsArr.map((item, index) => (
          <div
            key={index + 1}
            className="card_item"
            style={{
              // backgroundColor: randomColor()
              width: `${windowW / 20}px`,
              height: `${windowW / 20}px`,
            }}
          >
            {/* {index} */}
          </div>
        ))}
      </div>
      {cardsArrTest.map((item, index) => (
        <CardItem
          key={item.id}
          attributes={item.attributes}
          styles={item.styles}
          handleStartDrag={handleStartDrag}
        >
          {item.component}
          {/* [<div>cxccc</div>] */}
        </CardItem>
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  showStatusBox,
};

export default connect(null, mapDispatchToProps)(Cards);

const CardItem = ({ attributes, styles, handleStartDrag, children }) => {
  return (
    <div
      key="dragEle2"
      className="testCard"
      style={styles}
      attributes={attributes}
      draggable={true}
      onDragStart={(e) => handleStartDrag(e, attributes)}
    >
      {children}
    </div>
  );
};
