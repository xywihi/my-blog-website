import React, { Suspense, useMemo, useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import {LocalStorage, scrollToTop} from "./util";
import RouteGuard from "./util/route_guard";
import HeaderNav from "./components/HeaderNav";
import "./global.css";
import "./style.less";
import themestyle from "./styles/theme.less";
// import "./styles/ioniccss.css"
import ThemeSwitch from "./components/themeSwitch";
import config from "./config";
import { handleHiddeNotices, showStatusBox } from "./store/actions";
import { connect } from "react-redux";
import { IonIcon } from "@ionic/react";
import { notifications, trashOutline } from "ionicons/icons";
// import socket from "./http/socke"
import SmallMusicPlayer from "./components/smallMusicPlayer";
import StatusBox from "./components/statusBox";

import "@/assets/fonts/huxiao.otf";
import "@/assets/fonts/siyuan.ttf";
import "@/assets/fonts/wenyue.otf";
import "@/assets/fonts/SourceHanSansCN-Bold.otf";

import MaskElement from "@/components/MaskElement";
// import Notices from "./components/notices"
const Notices = React.lazy(() => import("./components/notices"));
const Home = React.lazy(() => import("./pages/home"));
const News = React.lazy(() => import("./pages/news"));
const User = React.lazy(() => import("./pages/user"));
const Works = React.lazy(() => import("./pages/works"));
const ErrorBoundary = React.lazy(() => import("./components/ErrorBoundary"));
const newLocalStorage = new LocalStorage();
const test_notices = [
  // {text:'郑爽和吴亦凡的百度百科都已修改，郑爽介绍内容中却还有作品名单',id:1,unmont:false}
];
const App = ({ notices,noticeList, statusBoxData, handleHiddeNotices,showStatusBox }) => {
  const [theme, setTheme] = useState("light");
  const [showNotice, setShowNotice] = useState(false);
  const [noticesNum, setNoticesNum] = useState(0);
  useEffect(() => {
    newLocalStorage.set("token", "Ber sddjjkwjfhiheh87687212ihr2khfjk");
    // console.log("app_page");
    return () => {
      // console.log("销毁当前项目");
    };
  }, []);

  // useEffect(() => {
  //     setShowNotice(notices.every(it=>it.unmont))
  // }, [notices])
  const changeTheme = (value) => {
    setTheme(() => {
      config.set(value);
      return value;
    });
  };

  const handleOpenMobileNav = e => {
    e.stopPropagation();
    const nav = document.querySelector(".mobile_Nav_out_box");
    setShowNotice(old=>{
      // handleOpenNoticeBox()
      const notice = document.querySelector(".notice_out_box");
      if(Array.from(notice.classList).includes("notice_out_box_open")){
        notice.classList.toggle("notice_out_box_open");
      }
      return !old
    })
    // //设置nav高度
    // 获取nav计算后的高度
    const navHeight = nav.offsetHeight;
    nav.classList.toggle("mobile_Nav_out_box_open");
  }

  const handleOpenNoticeBox = e => {
    e.stopPropagation();
    // e.preventDefault();
    // 获取html
    
    const notice = document.querySelector(".notice_out_box");
    notice.classList.toggle("notice_out_box_open");
    setShowNotice(old=>{
      const nav = document.querySelector(".mobile_Nav_out_box");
      if(Array.from(nav.classList).includes("mobile_Nav_out_box_open")){
        nav.classList.toggle("mobile_Nav_out_box_open");
      }
      return !old
    })
    handleHiddeNotices([...noticeList,{
      type:'计划',
      content:getRandomSentence(),
      date:getCurrentTime(),
      origin:'Anln',
      urgent:Math.floor(Math.random()*3),
      id:noticeList.length,
    }])
  }
// 获取当前时间，并以YYYY/MM/DD hh:mm格式返回
  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    return `${year}/${month}/${day} ${hour}:${minute}`;
  }
  // 随机生成一段话
  const getRandomSentence = () => {
    const sentences = [
      '明天继续敲代码...',
      "今天天气真好！",
      "今天晚上有电影！",
      "今天晚上有演唱会！",
      "今天晚上有音乐会！",
      "今天晚上有话剧！",
      "今天晚上有歌剧！",
      "今天晚上有芭蕾舞！",
      "今天晚上有舞蹈剧！",
      "今天晚上有歌剧！",
      "今天晚上有音乐会！",
      "今天晚上有演唱会！",
      "今天晚上有电影！",
      "今天晚上有话剧！",
    ];
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  }
  const handleDeleteNotice = (id,index) => {
    let newNoticeList = [...noticeList];
    newNoticeList.splice(index, 1);
    handleHiddeNotices(newNoticeList);
    // if(newNoticeList.length === 0){
    //   handleOpenNoticeBox()
    // }
  }
  const mainContent = useMemo(
    () => (
      <main className="flexBS bg2_blue">
        <aside className="maR24 paH12 paV24 bg1 borderR12">
          <HeaderNav
            changeTheme={changeTheme}
            direction="vertical"
            theme={theme}
          />
        </aside>
        
        <div className="contentBox flexFull scrollbarBox">
          <Notices manageNotices={notices.hidde} />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                exact
                path="/"
                Component={() => <Home key="home" />}
              ></Route>
              <Route
                path="/news/*"
                Component={() => RouteGuard(<News key="news" />)}
              ></Route>
              <Route path="/user" Component={() => <User key="user" />}></Route>
              <Route path="/works" Component={() => <Works key="works" />}></Route>
              <Route path="/*" Component={() => <Navigate to="/" />}></Route>
            </Routes>
          </Suspense>
        </div>
      </main>
    ),
    []
  );
  const handleScrollToTop = e => {
    scrollToTop(0)
  }
  return (
    <HashRouter basename="/">
      <ErrorBoundary>
        <div className={theme}>
          <div className="bg2_blue project textColor appOutBox">
            <header className="flexB pa16 bg1" >
              <div className="logo textColorWhite flexS" onClick={handleOpenMobileNav}>
                {/* <svg data-name="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 86.6"><polygon points="72.79 66.96 76.19 72.86 23.81 72.86 50 27.49 65.92 55.06 77.82 48.19 50 0 0 86.6 100 86.6 84.69 60.09 72.79 66.96"/><circle cx="50" cy="59.11" r="6.87"/></svg> */}
                <svg data-name="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 86.6">
                    <polygon className="svg-fill" points="72.79 66.96 76.19 72.86 23.81 72.86 50 27.49 65.92 55.06 77.82 48.19 50 0 0 86.6 100 86.6 84.69 60.09 72.79 66.96"/><circle className="svg-fill" cx="50" cy="59.11" r="6.87"/></svg>
              </div>
              <div className="widthFull heightFull" onClick={handleScrollToTop}></div>
              <div className="flexB">
                {/* <HeaderNav  theme={theme}/> */}
                <div className={`flexB relative maR24`}>
                  <SmallMusicPlayer />
                </div>
                <ThemeSwitch changeTheme={changeTheme} theme={theme}/>
                <div
                  className="noticeBtn_after paH6 maH12 borderR50 bg3"
                  onClick={handleOpenNoticeBox}
                >
                  <IonIcon
                    className="icon_hover"
                    icon={notifications}
                  ></IonIcon>
                </div>
              </div>
              
            </header>
            {/* 移动端导航栏 */}
            <div className="mobile_Nav_out_box">
              
            {showNotice && <MaskElement pointerEvents={true}/>}
                <div className="mobile_Nav_box bg1">
                  <HeaderNav
                    changeTheme={changeTheme}
                    direction="vertical"
                    theme={theme}
                  />
                </div>
              </div>
              {/* 通知信息框 */}
              <div className="notice_out_box">
                {showNotice && <MaskElement pointerEvents={true} />}
                
                <div className="notice_box height0 width0 bg1" >
                  <div className="scrollbarBox">
                    <ul>
                      {noticeList.map((item, index) => (
                        <li className="pa24" key={item.id}>
                          <div className="flexB">
                            <h4 className={`"maB6 fontB" ${item.urgent===1 ? "colorRed" : item.urgent===2 ?"colorOrange" : "colorBlue"}`}>{item.type}</h4>
                            <IonIcon onClick={()=>handleDeleteNotice(item.id,index)} icon={trashOutline} className="font16"/>
                          </div>
                          <p className="paV12">{item.content}</p>
                          <p className="flexB mrT12">
                            <span>{item.date}</span>
                            <span>{item.origin}</span>
                          </p>
                        </li>
                      ))
                      }
                      {
                        noticeList.length===0 && <li className="pa24">暂无通知</li>
                      }
                    </ul>
                  </div>
                  
                  
                </div>
              </div>
            {mainContent}
          </div>
        </div>
        {statusBoxData.show && <StatusBox statusBoxData={statusBoxData} devastateEl={showStatusBox}/>}
      </ErrorBoundary>
    </HashRouter>
  );
};

const mapStateToProps = (state) => ({
  notices: state.reducer.notices,
  statusBoxData: state.reducer.statusBoxData,
  noticeList:state.reducer.noticeList,
  // music: state.home.music,
});
const mapDispatchToProps = {
  handleHiddeNotices,
  showStatusBox
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
