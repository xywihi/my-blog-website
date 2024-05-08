import {ListenScroll} from './domFuncs'


// 防抖函数
function debounce(this: any, fn:Function,delay:number) {
    var timer:NodeJS.Timeout;
    return () =>{
        //清除上一次的延时器
        clearTimeout(timer);
        //重新设置新的延时器
        timer = setTimeout(() => {
            //修改this指向问题
            fn.apply(this)
        }, delay);
    }
}
// 处理时间为字符串
function handleTime(time:string | number){
    if(time && time!=='--:--' && time!=='00:00'){
        let issingleNum = (num:number)=>{
            return !num ? '00' : `${num.toString().length>1 ? num : '0'+num}`
        }
        let is60 = (num:number)=>{
            return num==60 ? '00' : issingleNum(num)
        }
        
        return (Number(time)>0 ? '' : '-') + issingleNum(Math.floor(Math.abs(Number(time))/60)) + ":"+is60(Math.ceil(Math.abs(Number(time))%60))
    }else{
        return "00:00";
    }
    
}

// 处理时间为数字
const handleTimeToNumber = (timeStr:string)=>{
    if(typeof timeStr!=="string") return 0;
    let newTime = timeStr.split(":");
    let seconds = Number(newTime[0])*60+Number(newTime[1]);
    return seconds;
}



// 函数用于进入全屏
function enterFullScreen() {
    var element:any = document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");  
        //IE 10及以下ActiveXObject 
        // if (window.ActiveXObject) {
        //     var WsShell = new ActiveXObject('WScript.Shell')
        //     WsShell.SendKeys('{F11}');
        // }
        // //HTML W3C 提议  
        // else 
        if (element.requestFullScreen) {
            element.requestFullScreen();
        }
        //IE11  
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        // Webkit (works in Safari5.1 and Chrome 15)  
        else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
        // Firefox (works in nightly)  
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
}
 
// 函数用于退出全屏
function exitFullScreen() {
    var element:any = document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");   
        //IE ActiveXObject  
        // if (window.ActiveXObject) {
        //     var WsShell = new ActiveXObject('WScript.Shell')
        //     WsShell.SendKeys('{F11}');
        // }
        // //HTML5 W3C 提议  
        // else 
        if (element.requestFullScreen) {
            document.exitFullscreen();
        }
        // //IE 11  
        // else if (element.msRequestFullscreen) {
        //     document.msExitFullscreen();
        // }
        // // Webkit (works in Safari5.1 and Chrome 15)  
        // else if (element.webkitRequestFullScreen) {
        //     document.webkitCancelFullScreen();
        // }
}

// 开关卡片
function openBox(e:Element & Event,boxElement:any,close:boolean,num=2){
    e.stopPropagation();
    e.preventDefault();
    // let boxElement = boxRef.current;
    if(e.target instanceof Element && e.target?.getBoundingClientRect().x!= boxElement.getBoundingClientRect().x){
        let boxParentElement = boxElement.parentElement;
        let boxHeight = boxElement.offsetHeight;
        let boxWidth = boxElement.offsetWidth;
        // let boxTop = boxElement.getBoundingClientRect().top;
        // let boxLeft = boxElement.getBoundingClientRect().left;

        let parentWidth = boxParentElement.offsetWidth;
        let parentHeight = boxParentElement.offsetHeight;
        let screenWidth = document.body.clientWidth;
        
        const closeBox = () => {
            boxElement.style.position = 'absolute';
            boxElement.style.width = `${parentWidth}px`;
            boxElement.style.height = `${parentHeight}px`;
            boxElement.style.zIndex = `0`;
            console.log('parentHeight',parentHeight)
            //删除添加的className
            let classNameStr = boxElement.className || '';
            let classNameStrArr = classNameStr.split(' ');
            classNameStrArr.splice(classNameStrArr.indexOf('cardBoxShadow'),1);
            boxElement.className = classNameStrArr.join(' ');
            //删除父级元素添加的className
            let classNameParentStr = boxParentElement.className || '';
            let classNameParentStrArr = classNameParentStr.split(' ');
            classNameParentStrArr.splice(classNameParentStrArr.indexOf('cardOutBox'),1);
            boxParentElement.className = classNameParentStrArr.join(' ');
            // 判断元素是否被移动过
            if(boxElement.style.transform){
                boxElement.style.transform = '';
            }
        }
        if(close) {
            if(parentWidth < boxWidth || parentHeight < boxHeight){
                closeBox()
            }
        }else{
            if(parentWidth < boxWidth || parentHeight < boxHeight){
                closeBox()
            }else{
                boxElement.style.position = 'absolute';
                boxElement.style.width = `${boxWidth*num}px`;
                boxElement.style.height = `${boxHeight*num}px`;
                boxElement.style.zIndex = `50`;
                boxElement.className += ` cardBoxShadow`;
                boxParentElement.className += ` cardOutBox`;
                // 页面滚动到顶部
                let distance = boxElement.getBoundingClientRect().top - 74
                let listenScroll =  new ListenScroll(document.documentElement)
                listenScroll.handleScrollByDistance(distance,'ver','bottom')
                console.log('boxElement.getBoundingClientRect()',boxElement.getBoundingClientRect())
                ;

                // 判断是否超出屏幕
                
                if(boxElement.getBoundingClientRect().x + boxWidth*num > screenWidth){
                    if(boxWidth*3 < screenWidth){
                        boxElement.style.transform = `translateX(${-(boxWidth*3)}px)`;
                    }else{
                        boxElement.style.width= `${boxWidth}px`;
                    }
                }
            }
        }
        
        
    }else{
        return
    }
}


//导出函数
export {
    debounce,
    handleTime,
    handleTimeToNumber,
    enterFullScreen,
    exitFullScreen,
    openBox,
}