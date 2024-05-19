import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import news_data from "./news_data.json";
import { debounce } from "@/util";
import { closeCircle, create } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import NewsItemBox from "./components/NewsItemBox";
import NewsNavBox from "./components/NewsNavBox";
import AceEditorBox from "@/components/AceEditorBox";
const newDebounce = debounce(function (fn) {
  fn && fn();
}, 500);
function Person() {
  const [newsData, setNewsData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchedList, setSearchedList] = useState([]);
  const [code, setCode] = useState(null);
  const [navList, setNavList] = useState([
    {
      name: "日记",
      value: "diary",
    },
    {
      name: "笔记",
      value: "note",
    },
    {
      name: "其他",
      value: "other",
    },
  ]);
  const navigate = useNavigate()
  useEffect(() => {
    let pathName = location.hash;
    if(pathName=='#/news/person') navigate('/news/person?type=diary')
    let currentNews = news_data.filter((item) => {
      return item.type === pathName.split("=")[1];
    });
    setNewsData(currentNews);
    return () => {
      // console.log('我被销毁了')
    };
  }, []);

  const handleSearchNews = (e) => {
    let eventValue = e.target.value || "";

    newDebounce(function () {
      if (eventValue == "") {
        setSearchedList([]);
        return;
      }
      let list = newsData.filter((item, index) => {
        return item.title.indexOf(eventValue) != -1;
      });
      setSearchedList((oldList) => {
        // setSelectItem(null);
        debugger;
        return list;
      });
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
          {!searchValue ? (
            newsData.map((item, index) => (
              <li key={item.id}>
                <NewsItemBox
                  newItem={item}
                  newIndex={index}
                  arrLength={newsData.length}
                />
              </li>
            ))
          ) : searchedList.length > 0 ? (
            searchedList.map((item, index) => (
              <li key={item.id}>
                {/* <NewsItemBox newItem={item} newIndex={index} arrLength = {searchedList.length}/> */}
              </li>
            ))
          ) : (
            <p className="font16 colorGray">暂无数据</p>
          )}
        </ul>
      </div>
      <div className={styles.newsNavBox}>
        <NewsNavBox navList={navList} />
      </div>
      <div
          className={`${styles.createNewBtn} font46 cursor icon_hover gray`}
          onClick={()=>navigate('/news/edit')}
        >
          <IonIcon icon={create} size="36px"></IonIcon>
        </div>
    </>
  );
}

export default Person;
