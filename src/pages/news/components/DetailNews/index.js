import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import MaskElement from "@/components/MaskElement";
import {
  heartOutline,
  heart,
  chatboxEllipses,
  arrowRedo,
  send,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { getTimeText } from "@/util";
import { showStatusBox } from "@/store/actions";
import { connect } from "react-redux";
import Loader from "@/components/animaIcons/loader";
const commentsArr = [
  {
    id: 0,
    user: "哈利波特",
    content: "哈哈哈！这技术可以。",
    time: 1705471828754,
    likes: 12,
    imgUrl:
      "https://tse1-mm.cn.bing.net/th/id/OIP-C.ofjm5a8hxRo_o7HYH3MxQgHaHX?w=202&h=200&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 1,
    user: "小鲁班",
    content: "哈哈哈！这技术可以。看看接下来的表现吧！",
    time: 1705471730118,
    likes: 12,
    imgUrl:
      "https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 2,
    user: "阿尔法",
    content: "哈哈哈！这技术可以。",
    time: 1705471600118,
    likes: 76,
    imgUrl:
      "https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=234&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 3,
    user: "詹姆斯",
    content: "哈哈哈！这技术可以。",
    time: 1705471550118,
    likes: 23,
    imgUrl:
      "https://tse3-mm.cn.bing.net/th/id/OIP-C.dN6NLMe9_qgenDX1VRyOOQAAAA?w=158&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 4,
    user: "约翰·凯尔",
    content: "哈哈哈！这技术可以。",
    time: 1705471430118,
    likes: 2,
    imgUrl:
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.yUorDiY6WO0l_0p-5aNtqQHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 5,
    user: "小宇宙",
    content: "哈哈哈！这技术可以。",
    time: 1705470730118,
    likes: 0,
    imgUrl:
      "https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 6,
    user: "魔镜本源",
    content: "哈哈哈！这技术可以。",
    time: 1705443730118,
    likes: 0,
    imgUrl:
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.yUorDiY6WO0l_0p-5aNtqQHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 7,
    user: "阿尔法",
    content: "哈哈哈！这技术可以。",
    time: 1705431730118,
    likes: 0,
    imgUrl:
      "https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=234&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 8,
    user: "詹姆斯",
    content: "哈哈哈！这技术可以。",
    time: 1705421730118,
    likes: 0,
    imgUrl:
      "https://tse3-mm.cn.bing.net/th/id/OIP-C.dN6NLMe9_qgenDX1VRyOOQAAAA?w=158&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 9,
    user: "约翰·凯尔",
    content: "哈哈哈！这技术可以。",
    time: 1705421730118,
    likes: 0,
    imgUrl:
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.yUorDiY6WO0l_0p-5aNtqQHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 10,
    user: "小宇宙",
    content: "哈哈哈！这技术可以。",
    time: 1705421730118,
    likes: 0,
    imgUrl:
      "https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 11,
    user: "魔镜本源",
    content: "哈哈哈！这技术可以。",
    time: 1700972031240,
    likes: 0,
    imgUrl:
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.yUorDiY6WO0l_0p-5aNtqQHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7",
  },
];

function DetailNews({ selectItem, showStatusBox }) {
  const [showComment, setShowComment] = useState(false);
  const [pageScroll, setPageScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // 监听页面滚动开始事件
    window.addEventListener("scroll", () => {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + clientHeight + 300 >= scrollHeight) {
        setPageScroll(true);
      } else {
        setPageScroll(false);
      }
    });
  }, []);
  const handleShareNews = () => {
    if (navigator.share) {
      navigator
        .share({
          ...selectItem,
          url: "https://my-blog-website-six.vercel.app/#/news/community",
        })
        .then(() => {
          console.log("Successful share");
        })
        .catch((error) => {
          console.log("Error sharing:", error);
        });
    } else {
      // 如果不支持Web Share API，可以考虑使用其他转发方案，例如通过微信等应用的JavaScript SDK
      // 这通常需要额外的集成工作，并且可能涉及到OAuth等安全措施
    }
  };
  const handleSendComment = () => {
    setLoading(true);
    let timer = setTimeout(() => {
      commentsArr.unshift({
        id: commentsArr.length + 1,
        user: "小宇宙",
        content: newComment,
        time: new Date().getTime(),
        likes: 0,
        imgUrl:
          "https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=234&h=180&c=7&r=0&o=5&pid=1.7",
      });
      showStatusBox({
        show: true,
        // message:"网络异常，请稍后再试",
        message: "发送成功",
        status: "success",
      });
      setNewComment("");
      setLoading(false);
      clearTimeout(timer);
    }, 3000);
  };
  return (
    <div className={`heightFull ${styles.detailNewsOutBox}`}>
      <div className={`${styles.detailNewsBox} heightFull `}>
        <div className="hotestNews paH24">
          <div className="maB12 ">
            <h2 className="maB6 fontB">{selectItem?.title}</h2>
            <p className="colorGray fontSmall">{selectItem?.date}</p>
            <hr className="maV12 opacity20" />
            <div></div>
          </div>
          <div className={styles.hotestNews_content_box}>
            <img className="borderR6 maV12" src={selectItem?.imgUrl} />

            <div className="news_content_box_text">
              <section className="maB12">
                2023年电影春节档，《流浪地球2》《满江红》上映数日即以逾10亿元票房一路“领跑”。其中，科幻背景的《流浪地球2》不仅取得了票房的成功，也带火了包括浸没液冷计算机、外骨骼等“黑科技”。
              </section>
              <section className="maB12">
                实际上，《流浪地球2》中多次出现的“外骨骼”近年来正逐步开启商业化。
              </section>
              <section className="maB12">
                据《中国基金报》刊文介绍，随着感知计算技术和传感系统发展日益成熟，机器人研发方向从人机协作逐步迈向人机融合，逐渐成为人类身体的一部分。
              </section>
              <section className="maB12">
                从流程上看，外骨骼即从依赖硬件传感器收集人体生物电信号，发展成为将硬件客观数据与人体主观信息相结合的新型信息输入方式。
              </section>
              <section className="maB12">
                信息接收后，机器的计算能力与人体的思维能力进行信息处理，再通过机器的算法能力与人体的决策能力互相协调、优化判断后进行智能输出，将人体智能与机器智能相融合，从单向输出转为双向互动，从而形成更高效的人机一体化智能科学系统。
              </section>
              <section className="maB12">
                值得注意的是，就在《流浪地球2》上映前不久，今年1月18日，工业和信息化部等十七部门印发了关于“机器人+”应用行动实施方案的通知。其中也明确提到了对发展外骨骼机器人的支持。
              </section>
              <section className="maB12">
                与电影中稍有不同的是，工信部此番实施方案将外骨骼机器人的发展放在养老服务方面。
              </section>
            </div>
          </div>
        </div>
        <div className={`${styles.hotestNews_comment_area} bg3 pa24 heightFull`}>
          <div className="hotestNews_comment_header_box flexB">
            <h3 className="maB6 fontB">评论区</h3>
            <p>总共120条</p>
          </div>
          <hr className="maV12 opacity20" />
          <div className={`borderR6 ${styles.hotestNews_comment_area_box} scrollbarBox scrollbarBox_hidden`}>
            <ul className={`borderR6 ${styles.hotestNews_comment_area_box_text}`}>
              {commentsArr.map((item, index) => (
                <li key={item.id}>
                  <img src={item.imgUrl} />
                  <div className="widthFull">
                    <div className="flexB">
                      <div>
                        <p className="name colorGray">{item.user}</p>
                        <p className="content flexB">{item.content}</p>
                      </div>
                      <div className="flexB maL12">
                        <span className="maR3 fontSmall">
                          {item.likes ? item.likes : ""}
                        </span>
                        <IonIcon
                          icon={item.likes > 0 ? heart : heartOutline}
                          color={"#fff"}
                          size="36px"
                        ></IonIcon>
                      </div>
                    </div>
                    <p className="font10 maT3 colorGray">
                      {getTimeText(item.time)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className={`${styles.createComment_box} bg1`}>
                <input
                  className="bg3"
                  placeholder="文明上网理性发言..."
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                />
                {loading ? (
                  <Loader />
                ) : (
                  <label className="font16">
                    {newComment != "" ? (
                      <IonIcon
                        icon={send}
                        className=""
                        onClick={handleSendComment}
                      ></IonIcon>
                    ) : (
                      <IonIcon icon={send} className="opacity20"></IonIcon>
                    )}
                  </label>
                )}
              </div>
          </div>
        </div>
      </div>

      {/* 详情按钮 */}
      <div
        className={`${styles.btns_box} ${
          pageScroll ? "opacity0" : "opacity100"
        }`}
      >
        <div>
          <div className="colorRed">
            <IonIcon icon={heart} className=""></IonIcon>
          </div>
          <p className="maT6">{selectItem.likeNum}</p>
        </div>
        <div>
          <div>
            <IonIcon
              icon={chatboxEllipses}
              className=""
              onClick={() => {
                setShowComment(true);
              }}
            ></IonIcon>
          </div>
          <p className="maT6">{selectItem.seeNum}</p>
        </div>
        <div>
          <div>
            <IonIcon
              icon={arrowRedo}
              className=""
              onClick={handleShareNews}
            ></IonIcon>
          </div>
          <p className="maT6">{selectItem.seeNum}</p>
        </div>
      </div>
      {/* 详情评论区 */}
      {showComment && (
        <div
          className={`${styles.comment_box} scrollbarBox scrollbarBox_hidden borderTR12`}
        >
          <MaskElement
            click={() => {
              setShowComment(false);
            }}
          />
          <div className={`${styles.comment_header_out_box} bg1 pa24`}>
            <div className={`${styles.comment_header_box} flexB`}>
              <h3 className="maB6 fontB">评论区</h3>
              <p className="font14">总共{commentsArr.length}条</p>
            </div>
            <hr className="opacity20" />
          </div>
          <div className={`${styles.comment_area_box} bg1 pa24`}>
            <div className={`borderR6 ${styles.hotestNews_comment_area_box_mobile} scrollbarBox scrollbarBox_hidden`}>
              <ul className={`borderR6 ${styles.hotestNews_comment_area_box_text_mobile}`}>
                {commentsArr.map((item, index) => (
                  <li key={item.id}>
                    <img src={item.imgUrl} />
                    <div className="widthFull">
                      <div className="flexB  maB6">
                        <div>
                          <p className="name font14 colorGray">{item.user}</p>
                          <p className="content flexB">{item.content}</p>
                        </div>
                        <div className="flexB maL12">
                          <IonIcon
                            icon={item.likes > 0 ? heart : heartOutline}
                            color={"#fff"}
                            size="36px"
                          ></IonIcon>
                          <span className="maL3 fontSmall">
                            {item.likes ? item.likes : ""}
                          </span>
                        </div>
                      </div>
                      <p className="font10 maT3 colorGray">
                        {getTimeText(item.time)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={`${styles.createComment_box} bg1`}>
                <input
                  className="bg3"
                  placeholder="文明上网理性发言..."
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                />
                {loading ? (
                  <Loader />
                ) : (
                  <label className="font16">
                    {newComment != "" ? (
                      <IonIcon
                        icon={send}
                        className=""
                        onClick={handleSendComment}
                      ></IonIcon>
                    ) : (
                      <IonIcon icon={send} className="opacity20"></IonIcon>
                    )}
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ); // eslint-disable-line
}

const mapDispatchToProps = {
  showStatusBox,
};
export default connect(null, mapDispatchToProps)(DetailNews);
