import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LocalStorage } from "@/util";
import "./styles.less";
import { logOut } from "@/http/require";
import { IonIcon } from "@ionic/react";
import {
  exit,
  play,
  home,
  newspaper,
  person,
  diamond,
  albums,
  analytics,
  lockClosed,
  grid,
} from "ionicons/icons";
const allRoutes = [
  { path: "/", text: "主页", icon: home },
  {
    path: "/news",
    text: "新闻",
    icon: newspaper,
    children: [
      { path: "/news/community", text: "社区" },
      { path: "/news/person/0", text: "个人" },
    ],
  },
  { path: "/works", text: "我的作品", icon: diamond },
  {
    path: "/data",
    text: "数据中心",
    icon: analytics,
    children: [
      { path: "/data/overview", text: "数据概览" },
      { path: "/data/customers", text: "客户列表" },
      { path: "/data/articles", text: "文章列表" },
      { path: "/data/orders", text: "订单列表" },
    ],
  },
  { path: "/authority", text: "权限中心", icon: lockClosed },
  { path: "/cards", text: "卡片中心", icon: albums },
  { path: "/user", text: "个人中心", icon: person },
];
const newLocalStorage = new LocalStorage();
function HeaderNav({ direction, handleShowNavigation, routes }) {
  const [activeNavIndex, setActiveNavIndex] = useState(null);
  const [currentRoute, setCurrentRoute] = useState("/");
  const [hiddenNav, setHiddenNav] = useState(true);
  useEffect(() => {
    let currentPath = location.hash.replace("#", "");
    setCurrentRoute(currentPath !== "" ? currentPath : "/");
    // console.log("location.hash------------",location.hash)
  }, []);

  useEffect(() => {
    console.log("location.hash", location.hash);
    // let newStr= location.hash
    // setCurrentRoute(newStr.replace("#",""))
  }, [location.hash]);
  const activeNav = (index) => {
    setActiveNavIndex(index);
  };

  const handleChangeNavHidden = ()=>{
    document.getElementsByTagName("aside")[0].style.width=!hiddenNav? "46px": "15vw";
    setHiddenNav(!hiddenNav)
  }
  return (
    <nav
      className={
        direction == "vertical"
          ? "navBox flexBS column heightFull paH12"
          : "navBox flexBS column heightFull paH12"
      }
      onMouseEnter={handleChangeNavHidden}
      onMouseLeave={handleChangeNavHidden}
    >
      <ul className={direction == "vertical" ? "navListBox" : "navListBox flexB"}>
        {allRoutes.map((item, index) => (
          <li
            key={item.path}
            onMouseEnter={() => activeNav(index)}
            onMouseLeave={() => activeNav(null)}
            className={`navBtn maB6 borderR6 ${
              hiddenNav ? "" : (!item.children) ? "activeNav" : "activeNavFartherBox"
            } ${
              (currentRoute.indexOf(item.path) != -1 &&
                item.path != "/" &&
                !item.children) ||
              (item.path == currentRoute && !hiddenNav)
                ? "activeNavOld"
                : currentRoute.indexOf(item.path) != -1 && item.children && !hiddenNav
                ? "activeNavOldNoB"
                : ""
            }`}
          >
            {!item.children ? (
              <Link
                to={item.path}
                className=""
                onClick={() => setCurrentRoute(item.path)}
              >
                <div className="flexS">
                <div className="font18">
                  <IonIcon icon={item.icon}></IonIcon>
                </div>
                {!hiddenNav && <span className={`navName maL12 `}>{item.text}</span>}
                </div>
              </Link>
            ) : (
              <div className="flexB">
                <div className="flexS">
                <div className="font18">
                  <IonIcon icon={item.icon}></IonIcon>
                </div>
                  {!hiddenNav && <span className="navName maL12">{item.text}</span>}
                </div>
                {item.children && !hiddenNav && (
                  
                  <div className="font14 maR6">
                  <IonIcon
                    className="moreIcon"
                    icon={play}
                    onClick={logOut}
                  ></IonIcon>
                </div>
                )}
              </div>
            )}
            {item.children && !hiddenNav && activeNavIndex == index && (
              <ul className="maL12 pa12">
                {item.children.map((it) => (
                  <li
                    key={it.path}
                    className={`pa12 borderR6 activeNav ${
                      currentRoute == it.path ? "activeNavOld" : ""
                    }`}
                  >
                    <Link
                      to={it.path}
                      className="flexB"
                      onClick={() => {
                        setCurrentRoute(it.path);
                      }}
                    >
                      {!hiddenNav && <span>{it.text}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div
          className={
            direction == "vertical"
              ? "logout borderR6"
              : "logout borderR6 maV12"
          }
          title="退出"
          onClick={logOut}
        >
          {
            !hiddenNav &&
            <span>退出</span>
          }
          <div className="font24 cursor icon_hover">
            <IonIcon icon={exit}></IonIcon>
          </div>
        </div>
    </nav>
  );
}

export default HeaderNav;
