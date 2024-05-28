import React, { useEffect, useState,useCallback } from "react";
import styles from "./index.module.less";
import { IonIcon } from "@ionic/react";
import { cogOutline } from "ionicons/icons";
import fenxi from "../../icons/fenxi.svg";
import customers from "../../icons/custorms.svg";
import location from "../../icons/location.svg";
import news from "../../icons/news.svg";
import pen from "../../icons/pen.svg";
import download from "../../icons/download.svg";
import filter from "../../icons/filter.svg";
import pen_activce from "../../icons/pen_activce.svg";
import download_active from "../../icons/download_active.svg";
import filter_active from "../../icons/filter_active.svg";
import { connect } from "react-redux";
import {showStatusBox} from "@/store/actions";
import PagerBox from "@/components/PagerBox";
import { searchArticles } from "@/http/require";
import {getTimeText2,debounce,exportToExcel } from "@/util";
const newDebounce = debounce(function (fn) {
  fn && fn();
}, 500);
const columnNames = [
  {
    name: "ID",
    id: "1",
    key:"ID"
  },
  {
    name: "标题",
    id: "2",
    key:"Title"
  },
  {
    name: "作者",
    id: "3",
    key:"Author"
  },
  {
    name: "创建时间",
    id: "4",
    key:"CreatedAt"
  },
  {
    name: "类型",
    id: "5",
    key:"Type"
  },
];

function Articles({showStatusBox}) {
  const [currentPage, setCurrentPage] = useState(3);
  const [selected, setSelected] = useState([]);
  const [navNameSelected, setNavNameSelected] = useState([]);
  const [showOperation, setShowOperation] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [hoverDownload, setHoverDownload] = useState(false);
  const [hoverPen, setHoverPen] = useState(false);
  const [hoverFilter, setHoverFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [columnsData, setColumnsData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [pagerData, setPagerData] = useState({
    total: 258,
    page: 1,
    pageSize: 5,
    totalPage: 2,
  });
  useEffect(() => {
    setNavNameSelected(columnNames)
    getData()
  },[])
  const getData = async (query="",page = 1, size = 5) => {
    setLoading(true);
    const res = await searchArticles({query,author:"anln@gmail.com",page,size})
    setLoading(false);
    if(res?.code===200){
        setColumnsData({
            ...res.data,
            Articles:res.data.Articles?.reverse().map((item,index)=>{
                return {
                    ...item,
                    CreatedAt:getTimeText2(item.CreatedAt),
                    Type:item.Type==='0'?"日记":item.Type==='1'?"笔记":"其他",
                }
            })
        })
        setPagerData({
            ...pagerData,
            total:res.data.Total,
            totalPage:res.data.Pages,
            pageSize:res.data.Size,
        })
    }else{
      showStatusBox({
        show:true,
        message:res?.code==401?"还未登陆或已退出，请登录后再试":"数据请求失败，请稍后再试",
        status:"warning"
    })
    }
  }
  
  const handleSelect = (id) => {
    if (id === "all") {
      if (selected.length === columnsData?.Articles.length) {
        setSelected([]);
      } else {
        setSelected(columnsData?.Articles.map((item) => item.ID));
      }
      return;
    }
    // 选中状态
    const index = selected.indexOf(id);
    if (index === -1) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((item) => item !== id));
    }
  };

  const handleScrollTable = (e) => {
    const tableHeaderBox = document.getElementById("tableHeaderBox");
    // tableHeaderBox.scrollLeft = e.target.scrollLeft;
    tableHeaderBox.scrollTo(e.target.scrollLeft, 0);
  };

  const handleSelectNavName = (item) => {
    if (item === "all") {
      if (navNameSelected.length === columnNames.length) {
        setNavNameSelected([]);
      } else {
        setNavNameSelected(columnNames.map((it) => it));
      }
      return;
    }
    // 选中状态
    const index = navNameSelected.indexOf(item);
    if (index === -1) {
      setNavNameSelected([...navNameSelected, item]);
    } else {
      setNavNameSelected(navNameSelected.filter((it) => it.id !== item.id));
    }
  };
  const handleSearch = (e) => {
    let newValue= e.target.value
    setSearchValue(newValue)
    let test = ()=>{
      getData(newValue)
    }
    newDebounce(test)
  };

  const handleDownloadFile = ()=>{
    console.log(selected)
    let selectItems = columnsData.Articles.filter(item=>selected.includes(item.ID))
    .map(it=>{
      let obj={}
      columnNames.forEach(item=>{
        obj[item.key]=it[item.key]
      })
      return obj;
    })
    exportToExcel(selectItems,"文章列表")
  }
  return (
    <div className={`${styles.tableBox} paV24 borderR12`}>
      <div className="flexB">
        <p className="maB12 flexS paH24">
          <div className="font20 maR12 lineFull">
            <IonIcon icon={customers}></IonIcon>
          </div>
          <span className="fontB">文章列表</span>
        </p>
        <div className={`flexS paH24 ${styles.tableBox_rightBox}`}>
          {navNameSelected.length > 0 && (
            <>
              <div
                className={`borderR6 maL6 font24 bg1 cursor icon_hover action`}
                onClick={() => setShowOperation(!showOperation)}
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setHoverPen(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setHoverPen(!hoverPen);
                }}
                data-content="批量处理与编辑"
              >
                <IonIcon
                  icon={showOperation || hoverPen ? pen_activce : pen}
                ></IonIcon>
              </div>
              <div
                className="borderR6 maL6 font24 bg1 action"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setHoverDownload(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setHoverDownload(!hoverDownload);
                }}
                onClick={handleDownloadFile}
                data-content="下载为Excel文件"
              >
                <IonIcon
                  icon={hoverDownload ? download_active : download}
                ></IonIcon>
              </div>
            </>
          )}

          <div
            className={`borderR6 maL6 font24 bg1 action ${styles.filterBox}`}
            onMouseOver={(e) => {
              //   e.stopPropagation();
              setHoverFilter(true);
            }}
            onMouseLeave={(e) => {
              //   e.stopPropagation();
              setHoverFilter(!hoverFilter);
            }}
            data-content="过滤列名"
          >
            <IonIcon
              icon={hoverFilter || showFilter ? filter_active : filter}
              onClick={(e) => {
                // e.preventDefault()
                e.stopPropagation();
                setShowFilter(!showFilter);
              }}
            ></IonIcon>
            <div className={` ${styles.filterBox_innerBox}`}>
              {showFilter && (
                <div className={`scrollbarBox heightFull boxShadow`}>
                  <ul className="pa12 bordeR12 bg1 font14 flexB column">
                    <li className="flexB">
                      <input
                      checked={navNameSelected.length === columnNames.length}
                        type="checkbox"
                        onChange={() => handleSelectNavName("all")}
                      />
                      <span>全选</span>
                    </li>
                    {columnNames.map((item, index) => {
                      return (
                        <li className="flexB" key={index}>
                          <input
                            type="checkbox"
                            checked={navNameSelected.includes(item)}
                            onChange={() => handleSelectNavName(item)}
                          />
                          <span>{item.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="pa12 bg1">
            <input placeholder="通过用户名/城市名搜索"  value={searchValue} onChange={handleSearch}/>
          </div>
        </div>
      </div>

      <div className={`bg1 borderR12 pa24 ${styles.tableListBox}`}>
        <div className={styles.tableListInnerBox}>
          <div
            className="widthFull scrollbarBoxX scrollbarBox_hidden"
            id="tableHeaderBox"
          >
            <ul
              className={`${styles.columnNamesBox}`}
              style={{
                gridTemplateColumns: `32px minmax(60px, 326px)  repeat(${
                  navNameSelected.length - (showOperation ? 1 : 0)
                }, 1fr) ${showOperation ? "60px" : ""}`,
                minWidth: `${100 * (navNameSelected.length - 1)}px`,
              }}
            >
              {showOperation && (
                <li className={`paH6 paV10 paB16 ${styles.operaLeftBox} bg1`}>
                  <input
                    type="checkbox"
                    onChange={() => handleSelect("all")}
                    checked={selected.length === columnsData?.Articles.length}
                  />
                </li>
              )}
              {navNameSelected.map((item, index) => {
                return (
                  <li key={index} className={`pa6 paV10`}>
                    <span className="font14 fontB">{item.name}</span>
                  </li>
                );
              })}
              {/* {showOperation && (
                <li className={`pa6 paV10 ${styles.operaBox} bg1`}>
                  <span className="font14 fontB cursor active">+ 新增</span>
                </li>
              )} */}
            </ul>
          </div>
          <div className={`${styles.columnsBox}`}>
            <div
              className="widthFull scrollbarBoxX"
              onScroll={handleScrollTable}
            >
              <ul
                className={`flexS column`}
                style={{ minWidth: `${100 * (navNameSelected.length - 1)}px` }}
              >
                {columnsData?.Articles.map((item, index) => {
                  return (
                    <li key={index} className="borderR12 ">
                      <ul
                        className={`borderR12 ${styles.columnNamesBox} ${
                          index % 2 === 0 ? "bg3" : ""
                        }`}
                        style={{
                          gridTemplateColumns: `32px minmax(60px, 326px) repeat(${
                            navNameSelected.length - (showOperation ? 1 : 0)
                          }, 1fr) ${
                            showOperation ? "60px" : ""
                          }`,
                        }}
                      >
                        {showOperation && (
                          <li
                            className={`pa6 paV10 ${styles.operaLeftBox} bg1`}
                          >
                            <input
                              type="checkbox"
                              checked={selected.indexOf(item.ID) > -1}
                              onChange={() => handleSelect(item.ID)}
                            />
                          </li>
                        )}
                        {navNameSelected.map((it, i) => {
                          return (
                            <li key={i} className={`pa6 paV10 `}>
                              <span className="font14 ellipsis-line">{item[it.key]}</span>
                            </li>
                          );
                        })}
                        {showOperation && (
                          <li className={`pa6 paV10 ${styles.operaBox} bg1`}>
                            <div className="font20 textCenter cursor icon_hover">
                              <IonIcon icon={cogOutline} />
                            </div>
                          </li>
                        )}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={`${styles.footerBox} flexB widthFull`}>
              <p className="font14">
                总数：{columnsData?.Total.toLocaleString("en-US")}
              </p>
              <PagerBox data={pagerData} getData={(page,size)=>getData(searchValue,page || pagerData.page,size || pagerData.pageSize)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => ({
    // music: state.home.music,
  });
  const mapDispatchToProps = {
    showStatusBox
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Articles);
