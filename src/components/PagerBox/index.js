import React, { useState,memo } from "react";
import styles from "./index.module.less";
import { IonIcon } from "@ionic/react";
import { caretBackOutline, caretForwardOutline } from "ionicons/icons";
function PagerBox({data,getData}) {
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangePage = (page) => {
    setCurrentPage(page);
    getData(page);
  };

  const hadnleToPage = (e) => {
    getData(Number(e.target.value));
    setCurrentPage(Number(e.target.value));
  }
  return (
    <div className="flexS maT12">
        <div className="bg3 flexS borderR12 ">
          <div className={`${styles.everyPageBox} paV6 paH12`}>
            <span className="font14">每页显示</span>
            <select
              name=""
              id=""
              className="font14 maL12"
              value={data.pageSize}
              onChange={(e) => getData(data.currentPage,e.target.value)}
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <span className="font14 maL12">条</span>
          </div>
          {
            data.totalPage > 1 &&
            <div className={`${styles.toPageBox} paV6 paH12`}>
            <span className="font14">跳至</span>
            <input type="number" max={data.totalPage} min={1} className="font14 maL12 bg1 maR12" value={currentPage} onChange={hadnleToPage}/>
            <span className="font14">页</span>
          </div>
          }
          <div className={`${styles.totalPageBox} paV6 paH12`}>
            <span className="font14">共</span>
            <span className="font14 maL12">{data.totalPage}</span>
            <span className="font14 maL12">页</span>
          </div>
        </div>
        <div className="flexC maL12">
          {currentPage > 1 && (
            <div className="font14 maL12 lineFull icon_hover action" data-content="第一页"  onClick={() => handleChangePage(1)}>
              <IonIcon icon={caretBackOutline}></IonIcon>
            </div>
          )}
          {currentPage === data.totalPage && data.totalPage > 2 ? (
            <>
              <span
                onClick={() => handleChangePage(currentPage - 2)}
                className="maL12 colorGray cursor icon_hover"
              >
                {currentPage - 2}
              </span>
              <span
                onClick={() => handleChangePage(currentPage - 1)}
                className="maL12 colorGray cursor icon_hover"
              >
                {currentPage - 1}
              </span>
              <span
                onClick={() => handleChangePage(currentPage)}
                className="maL12 active cursor"
              >
                {currentPage}
              </span>
            </>
          ) : (
            data.totalPage > 2 ?
            currentPage != 1 ? (
              <>
                <span
                  onClick={() => handleChangePage(currentPage - 1)}
                  className="maL12 colorGray cursor icon_hove"
                >
                  {currentPage - 1}
                </span>
                <span
                  onClick={() => handleChangePage(currentPage)}
                  className="maL12 colorGray cursor icon_hover active"
                >
                  {currentPage}
                </span>
                <span
                  onClick={() => handleChangePage(currentPage + 1)}
                  className="maL12 colorGray cursor icon_hover"
                >
                  {currentPage + 1}
                </span>
              </>
            ) : 
            <>
                <span
                  onClick={() => handleChangePage(1)}
                  className="maL12 cursor icon_hover active"
                >
                  1
                </span>
                <span
                  onClick={() => handleChangePage(2)}
                  className="maL12 colorGray cursor icon_hover"
                >
                  2
                </span>
                <span
                  onClick={() => handleChangePage(3)}
                  className="maL12 colorGray cursor icon_hover"
                >
                  3
                </span>
              </> :
              
              <>
                <span
                  onClick={() => handleChangePage(1)}
                  className={`maL12 cursor icon_hover ${currentPage ===1 ? 'active':'colorGray'}`}
                >
                  1
                </span>
                {
                  data.totalPage==2 &&
                  <span
                  onClick={() => handleChangePage(2)}
                  className={`maL12 cursor icon_hover ${currentPage ===2 ? 'active':'colorGray'}`}
                >
                  2
                </span>
                }
              </>
          )}

          {data.totalPage > 1 && currentPage != data.totalPage && (
            <div
              className={`font14 maL12 lineFull  cursor icon_hover action ${styles.caretForwardOutlineBox}`}
              data-content="最后一页"
              onClick={() => handleChangePage(data.totalPage)}
            >
              <IonIcon icon={caretForwardOutline}></IonIcon>
            </div>
          )}
        </div>
      </div>
  );
}



export default memo(PagerBox,(prevProps,nextProps)=>{
  // console.log('prevProps------',prevProps)
  return false
});