type ScrollState = {
    isToBottom: boolean;
    isToTop: boolean;
  };
  
  export const addNum = {
    count: 0,
    num: 0,
    allCount: 0,
    a:1,
    handleAddCount: function (totalDis:number) {
      const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);
      const calculateSine = (degrees: number) => {
        const radians = degreesToRadians(degrees);
        return Math.cos(radians);
      };
      const sine30 = calculateSine(this.num);
      this.count = Math.floor(Math.pow(sine30+1.74 , 2.5));
      if((this.allCount+this.count)<=totalDis)this.allCount += this.count;
      this.a++;
      if(this.num<=90){
        this.num += .4;
      }
      
    },
    reset:function(){
      this.count = 0;
      this.num = 0;
      this.allCount = 0;
    }
  };
  
  export class ListenScroll {
    constructor(el: any) {
      this.currentElement = el;
      this.horIsScrollState = {
        isToBottom: false,
        isToTop: true,
      };
      this.VerIsScrollToState = false;
    }
    currentElement: any | null = null;
    horIsScrollState: ScrollState;
    VerIsScrollToState: boolean;
  
    getIsToBottom(element: any, direction: "hor" | "ver", func?: Function) {
      const scrollLeft = element.scrollLeft;
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      let isToBottom = false;
      let isToTop = true;
      // // console.log("scrollLeft",element);
      // console.log(scrollLeft,isToTop)
      switch (direction) {
        case "hor":
          //查看横向滚动条是否滚动到底部
          isToBottom = scrollLeft + clientWidth === scrollWidth;
          //查看横向滚动条是否滚动到顶部
          isToTop = !scrollLeft;
          break;
        case "ver":
          //查看垂直方向滚动条是否滚动到底部
          isToBottom = scrollTop + clientHeight === scrollHeight;
          //查看垂直方向滚动条是否滚动到顶部
          isToTop = !scrollTop;
  
          break;
        default:
          break;
      }
      // // console.log("scrollLeft", { isToBottom, isToTop });
      this.horIsScrollState = { isToBottom, isToTop };
      func && func(this.horIsScrollState);
    }
    handleScrollByDistance(distance: number, direction: "hor" | "ver", toTOPBottom:"top" | "bottom") {
      const elChildWidth = this.currentElement?.children[0].children[1];
      const elMargin = window.getComputedStyle(elChildWidth).margin.split('px').slice(0,4)
      const otherDis = elMargin.filter((_,index)=>{
        if(direction === "hor"){
          return !((index+1)%2)
        }else{
          return (index+1)%2;
        }
      })
      .reduce((a, b) => a + Number(b), 0);
      const totalDis = distance + otherDis;
      // console.log('elChildWidth',otherDis,distance,totalDis);
      
      const timer = setInterval(() => {
        if((addNum.allCount+addNum.count)>totalDis){
          
          const newDisNum = toTOPBottom === 'top' ? -Number(totalDis - addNum.allCount + 24) : Number(totalDis - addNum.allCount + 12)
          switch (direction) {
            case "hor":
              //横向滚动
              this.currentElement?.scrollBy(newDisNum, 0);
              break;
            case "ver":
              //纵向滚动
              this.currentElement?.scrollBy(0, newDisNum);
              break;
            default:
              break;
          }
          // console.log(totalDis,addNum.allCount,newDisNum,addNum.allCount+newDisNum,distance + otherDis);
          addNum.reset();
          clearInterval(timer)
          return;
        }
        // console.log(addNum.allCount+addNum.count,totalDis);
        const distanceNum = toTOPBottom === 'top' ? -Number(addNum.count) : Number(addNum.count)
        switch (direction) {
          case "hor":
            //横向滚动
            this.currentElement?.scrollBy(distanceNum, 0);
            break;
          case "ver":
            //纵向滚动
            this.currentElement?.scrollBy(0, distanceNum);
            break;
          default:
            break;
        }
        addNum.handleAddCount(totalDis);
      }, 10);
      
      
    }
  }
  