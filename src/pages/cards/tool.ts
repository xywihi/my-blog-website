// import React from "react";

export const computeOrder = (arr: any[], bigToSmall : (0 | 1 | 2)) => {
  if(bigToSmall==2) return arr;
  let newArr = arr.sort((a, b) =>
    !bigToSmall
      ? a.props.wNum * a.props.hNum - b.props.wNum * b.props.hNum
      : b.props.wNum * b.props.hNum - a.props.wNum * a.props.hNum
  );
  return newArr;
};
export const computeCardCoordinate = (
  currentItem: [0, 0],
  unitHNum: number = 0,
  // unitVNum: number = 0,
  chessboard: [number, number][] = [],
  // hTotal:number,
  // vTotal:number,
  getUsedAreaArr: (arr: [number, number][]) => [number, number][],
  windowW: number
) => {
  let units = currentItem[0] * currentItem[1];
  let cardCoordinateArr: [number, number][] = [];
  let successAdd = chessboard.find((item) => {
    let isOutOfRange = false;
    cardCoordinateArr = Array(units)
      .fill(0)
      .map((_, index) => {
        let x = (index % currentItem[0]) + item[1];
        let y = Math.floor(index / currentItem[0]) + item[0];
        if (x * (windowW / unitHNum + 6) >= windowW) {
          // debugger
          isOutOfRange = true;
        }
        return [x, y];
      });
    return !isOutOfRange && getUsedAreaArr(cardCoordinateArr);
  });
  if (successAdd) {
    return cardCoordinateArr;
  } else {
    console.log("超出范围，不能放置");
    // return [];
  }
};
// const randomColor = () => {
//   let letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };
export const computeCardsOrder = (
  arr: [],
  windowW: number,
  unitHNum: number,
  unitVNum: number
) => {
  let orderArr = arr;
  let chessboard: [number, number][] = Array(unitHNum * unitVNum)
    .fill(0)
    .map((_, index) => {
      return [Math.floor(index / unitHNum), index % unitHNum];
    });
  let getUsedAreaArr = test();
  let hTotal = 0;
  let vTotal = 0;
  let cardsOrderArr = orderArr.map((item: any, index) => {
    hTotal += item.props.wNum;
    vTotal += item.props.hNum;
    return {
      id: index,
      attributes: {
        xyArr: computeCardCoordinate(
          [item.props.wNum, item.props.hNum],
          // orderArr[index - 1] ? orderArr[index - 1] : null,
          unitHNum,
          // unitVNum,
          chessboard,
          // hTotal,
          // vTotal,
          getUsedAreaArr,
          windowW
        ),
        symbol: "card"+index,
        // symbol: Symbol("card"+index),
        position: [0, 0],
      },
      styles: {
        width: `${(windowW / unitHNum) * item.props.wNum}px`,
        height: `${(windowW / unitHNum) * item.props.hNum}px`,
        left: `0px`,
        top: `0px`,
        // backgroundColor: "#333",
      },
      component: null,
      //   component: React.CreateElement({
      //     component: "div",
      //     props: {
      //       className: "card",
      //     },
      //   })
    };
  });
  return cardsOrderArr;
};
// <Banner wNum={6} hNum={4} unitWidth={windowW / 20} />,

const test = () => {
  let usedArea = [];
  return function (arr) {
    // console.log("arr", arr);
    // let arrTest = arr.reduce((acc: any, item: any) => {
    //   return [item,...acc];
    // }, []);
    let everyNoUsed = arr.every((item) => {
      return !usedArea.some((item2) => {
        return item[0] === item2[0] && item[1] === item2[1];
      });
    });
    if (everyNoUsed) usedArea = [...usedArea, ...arr];
    // console.log("arrTest----------", usedArea, arr, everyNoUsed);
    return everyNoUsed;
  };
};
