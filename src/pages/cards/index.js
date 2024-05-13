import React, { useEffect, useState, createRef, Children } from "react";
import "./styles.less";
import ExamCountdown from "./components/examCountdown";
import TimeWeather from "./components/timeWeather";
import MusicPlayer from "../../components/musicPlayer";
import TranslateBox from "./components/TranslateBox";
import SmoothedLine from "../../components/echarts/smoothedLine";
import { connect } from "react-redux";
import { showStatusBox } from "@/store/actions";
import Banner from "./components/Banner";
import PersonalAvatar from "./components/PersonalAvatar";
import CardCreator from "./components/CardCreator";
import NewsBox from "./components/NewsBox";
import FansMessagesBox from "./components/FansMessagesBox";
import MemorandumBox from "./components/MemorandumBox"
import { computeOrder, computeCardsOrder } from "./tool";
import Clocker from "./components/Clocker";

const windowW = window.innerWidth - 352;
const nnnn = windowW > 1400 ? 20 : windowW > 640 ? 10 : 1;
const existCardsArr = [
  <Banner wNum={6} hNum={4} unitWidth={windowW / nnnn} />,

  <CardCreator wNum={2} hNum={2} unitWidth={windowW / nnnn}>
    <PersonalAvatar cardSize="small" />
  </CardCreator>,
  <CardCreator wNum={4} hNum={2} unitWidth={windowW / nnnn}>
    <PersonalAvatar cardSize="middle" />
  </CardCreator>,
  <CardCreator wNum={2} hNum={1} unitWidth={windowW / nnnn}>
    <TimeWeather cardSize="small" />
  </CardCreator>,
  <CardCreator wNum={4} hNum={2} unitWidth={windowW / nnnn}>
    <TimeWeather cardSize="big" />
  </CardCreator>,
  <CardCreator
    wNum={4}
    hNum={6}
    minWNum={3}
    minHNum={3}
    unitWidth={windowW / nnnn}
  >
    <ExamCountdown />
  </CardCreator>,
  <CardCreator wNum={3} hNum={4} padding={24} unitWidth={windowW / nnnn}>
    <MusicPlayer />
  </CardCreator>,
  <CardCreator wNum={6} hNum={3} unitWidth={windowW / nnnn}>
    <TranslateBox />
  </CardCreator>,
  <CardCreator wNum={6} hNum={4} unitWidth={windowW / nnnn}>
    <SmoothedLine />
  </CardCreator>,
  <CardCreator wNum={2} hNum={2} unitWidth={windowW / nnnn}>
    <Clocker />
  </CardCreator>,
  <CardCreator wNum={4} hNum={2} padding={24} unitWidth={windowW / nnnn}>
    <NewsBox cardSize="small" />
  </CardCreator>,
  <CardCreator wNum={4} hNum={3} padding={24} unitWidth={windowW / nnnn}>
    <FansMessagesBox cardSize="small" />
  </CardCreator>,
  <CardCreator wNum={4} hNum={6} padding={24} unitWidth={windowW / nnnn}>
    <MemorandumBox cardSize="small" />
  </CardCreator>,
];

const createGrids = (xCount, yCount, cardsArr) => {
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
          xy[0] * (windowW / xCount) === item.x &&
          xy[1] * (windowW / xCount) === item.y
        ) {
          item.symbol = card.attributes.symbol;
          item.position = [item.x, item.y];
          item.used = true;
          item.height = Number(card.styles.height.split("px")[0]);
          item.width = Number(card.styles.width.split("px")[0]);
        }
      });
    });
    return item;
  });
  // console.log("grids", compNewGrids);
  // gridsArr = compNewGrids;
  return compNewGrids;
};
const Cards = ({ showStatusBox }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [wallImage, setWallImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gridsArr, setGridsArr] = useState([]);
  const [cardsArrTest, setCardsArr] = useState([]);

  // console.log("windowW", windowW);
  const childTranslate = createRef(null);
  let finalComputedCard = [];
  useEffect(() => {
    const arr = computeOrder(existCardsArr, 1);
    finalComputedCard = computeCardsOrder(arr, windowW, nnnn, 10).map(
      (item, index) => {
        item.component = (
          <div>
            <div></div>
          </div>
        );
        item.styles.left = `${
          ((item.attributes.xyArr?.[0]?.[0] || 0) * windowW) / nnnn
        }px`;
        item.styles.top = `${
          ((item.attributes.xyArr?.[0]?.[1] || 0) * windowW) / nnnn
        }px`;
        item.attributes.position = [
          ((item.attributes.xyArr?.[0]?.[0] || 0) * windowW) / nnnn,
          ((item.attributes.xyArr?.[0]?.[1] || 0) * windowW) / nnnn,
        ];
        item.component = existCardsArr[index];
        return item;
      }
    );

    setCardsArr(finalComputedCard);
    setGridsArr(createGrids(nnnn, 10, finalComputedCard));
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
    // debugger
    // 获取元素带有的属性
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    // console.log("handleStartDrag", typeof e.target.getAttribute("attributes"));
    let position = attributes.position;
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
    card.style.animation = "upMove .15s ease-in-out infinite";
    const clone = card.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.backgroundColor = `#cccccc80`;
    clone.style.transition = `none`;
    clone.style.opacity = `.2`;
    clone.style.animation = "none";
    document.getElementById("cardsArea").appendChild(clone);
    // 监听鼠标移动事件
    document.addEventListener("mousemove", handleDrag);
    // 监听鼠标松开事件
    document.addEventListener("mouseup", handleDrop);

    function handleDrag(e) {
      // 计算拖拽元素的新位置
      const newX = e.clientX - initialX + position[0];
      const newY = e.clientY - initialY + position[1];
      // console.log("newX", e.clientX , initialX , position[0]);
      // 更新拖拽元素的位置
      compLeft =
        newX < 0 ? 0 : newX > windowW - cardWidth ? windowW - cardWidth : newX;

      compTop =
        newY < 0
          ? 0
          : newY > (windowW / nnnn) * 10 - cardHeight
          ? (windowW / nnnn) * 10 - cardHeight
          : newY;
      // console.log("compLeft", compLeft);
      // debugger;
      // console.log("compTop", e.clientY , initialY,position[1],'--------',e.clientY - initialY,newY,newY < 0);
      // card.style.left = `${compLeft}px`;
      // card.style.top = `${compTop}px`;
      // card.style.zIndex = 99;
      //克隆card

      const newLeft =
        Math.floor(compLeft / (windowW / nnnn)) * (windowW / nnnn);
      const newTop = Math.floor(compTop / (windowW / nnnn)) * (windowW / nnnn);
      // console.log("compTop", compLeft, compTop, newLeft, newTop);
      clone.style.width = `${cardWidth + 20}px`;
      clone.style.height = `${cardHeight + 20}px`;
      clone.style.left = `${newLeft - 10}px`;
      clone.style.top = `${newTop - 10}px`;
      clone.style.zIndex = 99;
      console.log(
        "e.clientY - initialY",
        e.clientY,
        initialY,
        "newLeft,newTop",
        newLeft,
        newTop
      );
      // debugger;
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
        Math.floor(compLeft / (windowW / nnnn)) * (windowW / nnnn);
      const newTop = Math.floor(compTop / (windowW / nnnn)) * (windowW / nnnn);
      card.style.left = newLeft + "px";
      card.style.top = newTop + "px";
      card.style.animation = "fallDown 1s ease-in-out";
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
    parentEleStyle,
    card,
    attributes,
    cardWidth,
    cardHeight
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
        if (firstArea) {
          // debugger
          return;
        }
        usedArea.push({
          TLRBLR: [grid.x, grid.y, grid.x + grid.width, grid.y + grid.height],
          symbol: grid.symbol,
        });
        // debugger;
      }
    });
    let fourPoints = [];
    let moreTHeight = 0;
    let moreBHeight = 0;

    let moreWidth = 0;
    let moreRWidth = 0;
    // console.log("usedArea", gridsArr, usedArea);
    let trueNum = 0;
    let isOVerCards = usedArea.some((area) => {
      let checkCenterPoint =
        newLeft + cardWidth / 2 >= area.TLRBLR[0] + 1 &&
        newLeft + cardWidth / 2 <= area.TLRBLR[2] - 1 &&
        newTop + cardHeight / 2 >= area.TLRBLR[1] + 1 &&
        newTop + cardHeight / 2 <= area.TLRBLR[3] - 1;
      let checkLeftTop =
        newLeft >= area.TLRBLR[0] + 1 &&
        newLeft <= area.TLRBLR[2] - 1 &&
        newTop >= area.TLRBLR[1] + 1 &&
        newTop <= area.TLRBLR[3] - 1;
      let checkRightTop =
        newLeft + cardWidth > area.TLRBLR[0] + 1 &&
        newLeft + cardWidth < area.TLRBLR[2] - 1 &&
        newTop > area.TLRBLR[1] + 1 &&
        newTop < area.TLRBLR[3] - 1;
      let checkLeftBottom =
        newLeft > area.TLRBLR[0] + 1 &&
        newLeft < area.TLRBLR[2] - 1 &&
        newTop + cardHeight > area.TLRBLR[1] + 1 &&
        newTop + cardHeight < area.TLRBLR[3] - 1;
      let checkRightBottom =
        newLeft + cardWidth >= area.TLRBLR[0] + 1 &&
        newLeft + cardWidth <= area.TLRBLR[2] - 1 &&
        newTop + cardHeight >= area.TLRBLR[1] + 1 &&
        newTop + cardHeight <= area.TLRBLR[3] - 1;
      // debugger;
      trueNum = fourPoints.filter((item) => item).length;
      if (!checkCenterPoint || trueNum === 1) {
        if (
          checkLeftTop ||
          checkLeftBottom ||
          checkRightTop ||
          checkRightBottom
        ) {
          fourPoints.push(true);
          moreTHeight = cardHeight - (area.TLRBLR[3] - newTop);
          moreBHeight = area.TLRBLR[1] - newTop;

          moreWidth = cardWidth - (area.TLRBLR[2] - newLeft);
          moreRWidth = area.TLRBLR[0];
          // if(moreWidth > 0){
          //   cardWidth = moreWidth + 'px'
          // }

          // debugger;
        }
      }

      return checkCenterPoint || fourPoints.filter((item) => item).length > 1;
      // 防覆盖功能
      // return (
      //   (checkCenterPoint ||
      //   checkLeftTop ||
      //   checkRightTop ||
      //   checkLeftBottom ||
      //   checkRightBottom ) &&
      //   area.symbol != attributes.symbol
      // );

      // debugger
    });
    // if(trueNum===1){
    //   if (moreTHeight > 0) {
    //     cardHeight = moreTHeight + "px";
    //     card.style.height = moreTHeight + "px";
    //     card.style.top = newTop + cardHeight + "px";
    //     attributes.position = [newTop + cardHeight, newLeft + cardWidth];
    //     // debugger
    //   }
    //   if (moreBHeight > 0) {
    //     cardHeight = moreBHeight + "px";
    //     card.style.height = moreBHeight + "px";
    //     card.style.top = newTop + cardHeight + "px";
    //     attributes.position = [newTop + cardHeight, newLeft + cardWidth];
    //     // debugger;
    //   }
    //   // if (checkRightBottom || checkRightTop) {
    //   //   if (moreWidth > 0) {
    //   //     card.style.width = moreWidth + "px";
    //   //   }
    //   //   if (moreRWidth > 0) {
    //   //     card.style.width = moreWidth + "px";
    //   //   }
    //   //   // debugger;
    //   // }

    //   if (moreWidth > 0) {
    //     card.style.width = moreWidth + "px";
    //   }
    //   if (moreRWidth > 0) {
    //     card.style.width = moreWidth + "px";
    //   }
    // }
    return isOVerCards;
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

    if (
      handleCheckOver(
        newLeft,
        newTop,
        currentEleOldStyle,
        parentEleStyle,
        card,
        attributes,
        cardWidth,
        cardHeight
      )
    ) {
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
      console.log("newLeft, newTop", newLeft, newTop);
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
    // debugger;
    // console.log("grids", grids);
    // setGridsArr(grids);
    // gridsArr = grids;
    setGridsArr(grids);
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
              width: `${windowW / nnnn}px`,
              height: `${windowW / nnnn}px`,
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
      <div className="treasureChest_box">
        <div className="treasureChest">
          <div className="btnDefaultDeep"></div>
          <div className="btnDefault">
            <div
              className="logoTest textColorWhite flexS"
            >
              <svg
                data-name="logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 86.6"
              >
                <polygon
                  className="svg-fill"
                  points="72.79 66.96 76.19 72.86 23.81 72.86 50 27.49 65.92 55.06 77.82 48.19 50 0 0 86.6 100 86.6 84.69 60.09 72.79 66.96"
                />
                <circle className="svg-fill" cx="50" cy="59.11" r="6.87" />
              </svg>
            </div>
          </div>
          <div className="triangle btnDefault"></div>
          <div className="smallCards">
            <div className="btnDefault borderR12"></div>
            <div className="btnDefaultDeep borderR12"></div>
            <div className="btnDefault borderR12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  showStatusBox,
};

export default connect(null, mapDispatchToProps)(Cards);

const CardItem = ({ attributes, styles, handleStartDrag, children }) => {
  useEffect(() => {
    console.log("attributes", attributes);
    // console.log("styles", styles);
  }, [attributes]);
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
