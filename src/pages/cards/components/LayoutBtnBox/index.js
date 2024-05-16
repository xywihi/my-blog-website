import React, { useState } from "react";
// import { useSelector } from 'react-redux';
import styles from "./index.module.less";
import { connect } from "react-redux";
import { handelChangeLayout } from "../../store/action";

const LayoutBtnBox = ({ layoutNum, handelChangeLayout }) => {
  const [hoverBtn, setHoverBtn] = useState(false);
  return (
    <div
      data-tooltip="频繁切换布局会影响浏览器性能，建议选择的卡片数量不超过十个或不要频繁切换。"
      onMouseEnter={() => setHoverBtn(!hoverBtn)}
      onMouseLeave={() => setHoverBtn(!hoverBtn)}
      className={`${styles.layoutBtnBox} bg_blue colorWhite  fontB`}
      onClick={() =>
        handelChangeLayout(layoutNum === 0 ? 1 : layoutNum === 1 ? 2 : 0)
      }
    >
      <p className="flexC">
      <span className="font24">{layoutNum === 0 ? "S" : layoutNum === 1 ? "L" : "R"}</span>
      {hoverBtn && <span className={`${styles.layoutBtnBoxHover} fontSmall maL6 opacity50`}>{layoutNum === 0 ? "L" : layoutNum === 1 ? "R" : "S"}</span>}
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  layoutNum: state.cards.layoutNum,
});
const mapDispatchToProps = {
  handelChangeLayout,
};
export default connect(mapStateToProps, mapDispatchToProps)(LayoutBtnBox);
