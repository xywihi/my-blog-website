import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import news_data from "./news_data.json";
import HttpRequire from "@/http/require";
import {  debounce } from "@/util";
import {
  closeCircle,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import NewsItemBox from "./components/NewsItemBox"
const newDebounce = debounce(function (fn) {
  fn && fn();
}, 500);
function Person() {
  const [newsData, setNewsData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchedList, setSearchedList] = useState([]);
  useEffect(() => {
    const http = new HttpRequire("news");
    const apiUrl = `http://localhost:3008/news_data.json`;
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=zh_cn`;
    http.get(apiUrl).then((res) => {
      setNewsData([...res]);
    });
    // setNewsData(news_data);
    return () => {
      // console.log('我被销毁了')
    };
  }, []);

  
  const handleSearchNews = (e) => {
    let eventValue = e.target.value || '';

    newDebounce(function () {
      if (eventValue == "") {
        setSearchedList([]);
        return
      };
      let list = newsData.filter((item, index) => {
        return item.title.indexOf(eventValue) != -1;
      });
      setSearchedList((oldList) => {
        // setSelectItem(null);
        debugger
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
  return (
    <div className={`bg1 borderR12 ${styles.person_news_box}`}>
      <div className={`bg3 pa12 borderR6 ${styles.searchBox}`}>
        <input placeholder="输入关键字进行搜索..." className="bg3 widthFull" value={searchValue} onChange={handleSearchNews}/>
        {searchValue !=='' && (
            <div
              className={`${styles.search_btn} font24 colorGray`}
              onClick={handleSearchNews}
            >
              <IonIcon icon={closeCircle} size="36px"></IonIcon>
            </div>
          )}
      </div>
      <ul>
        {!searchValue ?
          newsData.map((item, index) => (
            <li key={item.id}>
              <NewsItemBox  newItem={item} newIndex={index} arrLength = {newsData.length}/>
            </li>
          )):
          (searchedList.length>0) ? searchedList.map((item, index) => (
            <li key={item.id}>
              {/* <NewsItemBox newItem={item} newIndex={index} arrLength = {searchedList.length}/> */}
            </li>
          )):
          <p className="font16 colorGray">暂无数据</p>
          
        }
      </ul>
    </div>
  );
}

export default Person;
