import React,{useEffect} from "react";
import styles from "./index.module.less";
import { Link, useParams } from "react-router-dom";
const NewsNavBox = ({ navList}) => {
  const route = location.hash.split("=")[1];
  const {type} = useParams();
  useEffect(() => {
    // 获取路由参数
    console.log("route", route);
    return () => {
      // console.log('我被销毁了')
    };
  }, []);
  return (
    <ul className={`${styles.navBox} bg1 borderR12 pa24`}>
      {navList.map((item, index) => {
        return (
          <li key={item.value} className={`maV12 ${type ===item.value  && styles.activeItem}`}>
            <Link
              to={'/news/person/'+item.value}
              className="flexS"
            >
              <span className="maL12">{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NewsNavBox;
