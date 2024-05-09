import React, { Suspense, useMemo, useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import {LocalStorage} from "./util";
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
import { notifications, shuffle, pause, play } from "ionicons/icons";
// import socket from "./http/socke"
import SmallMusicPlayer from "./components/smallMusicPlayer";
import StatusBox from "./components/statusBox";

import "@/assets/fonts/huxiao.otf";
import "@/assets/fonts/siyuan.ttf";
import "@/assets/fonts/wenyue.otf";
import "@/assets/fonts/SourceHanSansCN-Bold.otf";
// import Notices from "./components/notices"
const Notices = React.lazy(() => import("./components/notices"));
const Home = React.lazy(() => import("./pages/home"));
const News = React.lazy(() => import("./pages/news"));
const User = React.lazy(() => import("./pages/user"));
const ErrorBoundary = React.lazy(() => import("./components/ErrorBoundary"));
const newLocalStorage = new LocalStorage();
const test_notices = [
  // {text:'郑爽和吴亦凡的百度百科都已修改，郑爽介绍内容中却还有作品名单',id:1,unmont:false}
];
const App = ({ notices, statusBoxData, handleHiddeNotices,showStatusBox }) => {
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
              <Route path="/*" Component={() => <Navigate to="/" />}></Route>
            </Routes>
          </Suspense>
        </div>
      </main>
    ),
    []
  );

  return (
    <HashRouter basename="/">
      <ErrorBoundary>
        <div className={theme}>
          <div className="bg2_blue project textColor">
            <header className="flexB pa16 bg1">
              <div className="logo maH24 textColorWhite">
                {/* <svg data-name="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 86.6"><polygon points="72.79 66.96 76.19 72.86 23.81 72.86 50 27.49 65.92 55.06 77.82 48.19 50 0 0 86.6 100 86.6 84.69 60.09 72.79 66.96"/><circle cx="50" cy="59.11" r="6.87"/></svg> */}
                
                <svg data-name="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 86.6">
                    <polygon className="svg-fill" points="72.79 66.96 76.19 72.86 23.81 72.86 50 27.49 65.92 55.06 77.82 48.19 50 0 0 86.6 100 86.6 84.69 60.09 72.79 66.96"/><circle className="svg-fill" cx="50" cy="59.11" r="6.87"/></svg>
              </div>
              <div className="flexB">
                {/* <HeaderNav  theme={theme}/> */}
                <div className={`flexB relative maR24`}>
                  <SmallMusicPlayer />
                </div>
                <ThemeSwitch changeTheme={changeTheme} theme={theme}/>
                <div
                  className="noticeBtn_after paH6 maH12 borderR50 bg3"
                  onClick={() => handleHiddeNotices()}
                >
                  <IonIcon
                    className="icon_hover"
                    icon={notifications}
                  ></IonIcon>
                </div>
              </div>
            </header>
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
  // music: state.home.music,
});
const mapDispatchToProps = {
  handleHiddeNotices,
  showStatusBox
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
