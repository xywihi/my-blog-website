import React, { useEffect, useState, useRef, createRef } from "react";
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
const banners = [
  {
    url: "https://images.unsplash.com/photo-1599272585578-03bfc70032b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "平淡人生，浮躁心态",
    subtitle: "平淡人生，浮躁心态，梦想的美好是建立在残酷的现实之上。",
    time: "2023/09/01",
    id: 0,
  },
];
const Cards = ({ showStatusBox }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("zh");
  const [wallImage, setWallImage] = useState(null);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const childTranslate = createRef(null);
  useEffect(() => {
    // throwError()

    let timer = setInterval(() => {
      setCurrentDate(new Date());
      // setCurrentImageIndex(Math.floor(Math.random() * 7));
    }, 10000);
    const require = new HttpRequire();
    require
      .get("http://127.0.0.1:3000/api/bing_img")
      .then((res) => {
        setWallImage(res.images);
        // wallImage &&
        //   setCurrentImageIndex(
        //     Math.floor(Math.random() * (wallImage.length - 1))
        //   );
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      clearTimeout(timer);
    };
  }, []);
  // const throwError = () => {
  //     console.log('--------------------', 1/0)
  //     return 1/0
  //     // throw new Error('This is a simulated error.');
  // };
  const handleTranslate = () => {
    childTranslate.current.handleTranslate();
  };
  console.log("home_page");
  return (
    <div className="bg2_blue flexS flexWrap">
      <div className={styles.topAreaNox}>
        {/* 头图卡片 */}
        <div className="borderR12 mobileCard maB12 bg1 cardBox">
          <div>
            <img
              src={"https://loremflickr.com/473/370/mountain"}
              className="borderTR12"
            />
          </div>
          <div className="pa24 flexBS column">
            <h1 className="font_wenyue fontB maB12">
              {banners[0].title.split("，").map((item) => (
                <span className="maR12" key={item}>{item}</span>
              ))}
            </h1>
            <h5>
              <p className="maB12">{banners[0].subtitle}</p>
              <p className="gray">{banners[0].time}</p>
            </h5>
          </div>
        </div>
        <div className={styles.smallCardOutBox}>
          <div className={styles.smallCardTopBox}>
            {/* 个人头像卡片 */}
            <div className="borderR12 mobileCard maB12 screen_mid_inner1 bg1 pa24 flexS cardBox">
              <img
                alt="Silhouette of a person's head"
                src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7"
              />
              <div className="maH12">
                <h4 className="fontB">Anln</h4>
                <span className="fontSmall">疯狂努力拼搏中...</span>
              </div>
            </div>
            {/* 天气事件卡片 */}
            <div className="screen_mid_inner2 mobileCard maB12">
              <TimeWeather />
            </div>
            {/* 倒计时卡片 */}
            <div className="maB12 mobileCard item2_inner2 cardBox" style={{minHeight:"220px"}}>
              <ExamCountdown />
            </div>
            {/* 动态列表卡片 */}
            <div className="borderR12 mobileCard item3_inner1 bg1 pa24 maB12 cardBox">
              <h3 className="title maB12 flexB">
                <span>最新动态</span>{" "}
                <div className="cursor icon_hover">
                  <IonIcon icon={menu} size="36px"></IonIcon>
                </div>
              </h3>
              <ul className="widthFull">
                <li className="newsItemBox flexB maB6 paV6">
                  <span className="textSingeLine maR12 font14">
                    人间有神兽，来自九重天
                  </span>
                  <span className="fontSmall gray">2023/09/05</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.smallCardBottomBox}>
            {/* 音乐播放列表卡片 */}
            <div className="borderR12 maB12 mobileCard item2_inner1 bg1 pa24 cardBox">
              <MusicPlayer />
            </div>
            <div className={styles.smallCardBottomRightBox}>
              {/* 粉丝留言卡片 */}
              <div className="borderR12 maB12 mobileCard item3_inner2 bg1 pa24 cardBox messagesBox flexSS column ">
                <h3 className="title maB12 flexB widthFull">
                  <span>粉丝留言</span>{" "}
                  <div className="cursor icon_hover">
                    <IonIcon icon={menu} size="36px"></IonIcon>
                  </div>
                </h3>
                <div className="content flexB column flexFull widthFull">
                  <div className="messageInnerBox bg3 borderR6 pa12 flexFull maB12 widthFull flexBS column">
                    <div className="font14">
                      6月生日冠名争夺战结束,恭喜粉丝为@时代少年团-贺峻霖解锁惊喜福利
                    </div>
                    <div className="flexB gray widthFull fontSmall">
                      <span>8/23</span>
                      <span>四川</span>
                    </div>
                  </div>
                  <ul className="flexS widthFull">
                    <li className="maR12 activeAvatar">
                      <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7" />
                    </li>
                    <li className="maR12">
                      <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.ofjm5a8hxRo_o7HYH3MxQgHaHX?w=202&h=200&c=7&r=0&o=5&pid=1.7" />
                    </li>
                  </ul>
                </div>
              </div>

              {/* 翻译功能卡片 */}
              <div className="borderR12 maB12 item5 mobileCard bg1 pa24 cardBox">
                <div className="flexB maB24">
                  <h3 className="title">汉英翻译</h3>
                  <div className="flexB">
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="zh"
                          checked={selectedOption === "zh"}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setSelectedOption(e.target.value);
                          }}
                          className="maR6"
                        />
                        English
                      </label>
                      <label className="maL12">
                        <input
                          type="radio"
                          value="en"
                          checked={selectedOption === "en"}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className="maR6"
                        />
                        中文
                      </label>
                    </div>
                    <div
                      className="maL16 paV6 paH12 borderR12 bg2_blue icon_hover cursor flexB"
                      onClick={handleTranslate}
                    >
                      <IonIcon icon={language} size="36px"></IonIcon>
                      <span className="maL12">翻译</span>
                    </div>
                  </div>
                </div>
                <Translate
                  type={selectedOption}
                  ref={childTranslate}
                  showStatusBox={showStatusBox}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 可视化数据卡片 */}
      <div className={styles.echartsBox}>
        <div className="borderR12 mobileCard maB12 bg1 pa24 cardBox">
            <h3 className="title maB12">最新数据走势</h3>
            <div className="smoothedLine">
            <SmoothedLine />
            </div>
        </div>
      </div>
      {/* <div className="borderR12 item2_inner3 screen_big">
        <div className="borderR12 item2_inner3_inner1 bg1 pa24 flexS cardBox">
          <img
            alt="Silhouette of a person's head"
            src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7"
          />
          <div className="maH12">
            <h4 className="fontB">Anln</h4>
            <span className="fontSmall">疯狂努力拼搏中...</span>
          </div>
        </div>
        <TimeWeather />
      </div> */}
    </div>
  );
};

const mapDispatchToProps = {
  showStatusBox,
};

export default connect(null, mapDispatchToProps)(Cards);
