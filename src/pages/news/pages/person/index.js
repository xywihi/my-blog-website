import React, { useEffect, useState, createRef, useCallback } from "react";
import styles from "./index.module.less";
import news_data from "./news_data.json";
import { debounce } from "@/util";
import { closeCircle, create } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useNavigate, useParams } from "react-router-dom";
import NewsItemBox from "./components/NewsItemBox";
import NewsNavBox from "./components/NewsNavBox";
import PagerBox from "../../components/PagerBox";
import { getArticles,searchArticles } from "@/http/require";
import { handelChangeNews } from "../../store/action";
import { connect } from "react-redux";
import {showStatusBox} from "@/store/actions";
import {Loader} from "@/components/animaIcons";
const newDebounce = debounce(function (fn) {
  fn && fn();
}, 500);
function Person({ newsData, handelChangeNews,showStatusBox }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchedList, setSearchedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagerInfo, setPagerInfo] = useState({
    page: 1,
    pageSize: 10,
    total: 3,
  });
  const [navList] = useState([
    {
      name: "日记",
      value: "0",
    },
    {
      name: "笔记",
      value: "1",
    },
    {
      name: "其他",
      value: "2",
    },
  ]);
  const navigate = useNavigate();
  const { type } = useParams();
  const ref = createRef(null);
  let dom = document.getElementById(`newsItem0`);
  console.log("dom", dom);
  dom &&
    dom.addEventListener("scroll", function (e) {
      var scrollTop = this.scrollTop;
      console.log("dataLength", scrollTop);
    });
  
  useEffect(() => {
    getData()
    console.log("sadsadasd")
    return () => {
      // console.log('我被销毁了')
    };
  }, []);

  const getData = useCallback(() => {
    handleGetNewsData()
  },[type])

  const handleSearchNews = (e) => {
    let eventValue = e.target.value || "";

    newDebounce(function () {
      handleGetNewsData(eventValue)
      // console.log('list');
    });
    setSearchValue((old) => {
      if (eventValue != "") {
        return eventValue;
      }
      return eventValue;
    });
  };
  // 新增文章
  // const handleCreateNew = () => {
  //   set
  // }


  const handleGetNewsData = async (query="") => {
    setLoading(true);
    const res = await searchArticles({query, type: type,author:"anln@gmail.com",page:1,size:5})
    setLoading(false);
    if(res?.code===200){
      handelChangeNews(res.data.Articles?.reverse());
    }else{
      debugger
      showStatusBox({
        show:true,
        message:res?.code==401?"还未登陆或已退出，请登录后再试":"数据请求失败，请稍后再试",
        status:"warning"
    })
    }
  }
  const handleDeleteSelf = (id) => {
    let afterDeletedNewsData = newsData.filter((item, index) => {
      return item.ID != id;
    });
    handelChangeNews(afterDeletedNewsData);
  };
  return (
    <>
      <div className={`bg1 borderR12 ${styles.person_news_box}`}>
        <div className={`bg3 pa12 borderR6 ${styles.searchBox}`}>
          <input
            placeholder="输入关键字进行搜索..."
            className="bg3 widthFull"
            value={searchValue}
            onChange={handleSearchNews}
          />
          {searchValue !== "" && (
            <div
              className={`${styles.search_btn} font24 colorGray`}
              onClick={handleSearchNews}
            >
              <IonIcon icon={closeCircle} size="36px"></IonIcon>
            </div>
          )}
        </div>
        <ul>
          {!searchValue
            ? newsData.map((item, index) => (
                <li key={index} id={`newsItem${index}`} ref={ref}>
                  <NewsItemBox
                    newItem={item}
                    newIndex={index}
                    arrLength={newsData.length}
                    handleDeleteSelf={handleDeleteSelf}
                  />
                </li>
              ))
            : newsData.map((item, index) => (
                <li key={index} id={`newsItem${index}`}>
                  <NewsItemBox
                    newItem={item}
                    newIndex={index}
                    arrLength={searchedList.length}
                    handleDeleteSelf={handleDeleteSelf}
                  />
                </li>
              ))}
        </ul>
        {!newsData.length && <p className="font16 colorGray">{loading ? <span><Loader>数据加载中</Loader></span> : "暂无数据"}</p>}
      </div>
      <div className={styles.newsNavBox}>
        <NewsNavBox navList={navList} />
      </div>
      <div
        className={`${styles.createNewBtn} font46 cursor icon_hover gray`}
        onClick={() => navigate("/news/edit/create")}
      >
        <IonIcon icon={create} size="36px"></IonIcon>
      </div>
      {
        newsData.length ? <PagerBox pagerInfo={pagerInfo} dataLength={newsData.length || 1} /> : null
      }

      {/* {newsData.length > 0 && (
        <PagerBox pagerInfo={pagerInfo} dataLength={newsData.length || 1} />
      )} */}
    </>
  );
}

const mapStateToProps = (state) => ({
  newsData: state.news.newsData,
  // music: state.home.music,
});
const mapDispatchToProps = {
  handelChangeNews,
  showStatusBox
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);
