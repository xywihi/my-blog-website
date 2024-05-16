import React, { useEffect, useState, createRef } from "react";
import Translate from "@/components/translate";
import { IonIcon } from "@ionic/react";
import { language } from "ionicons/icons";
import styles from "./index.module.less";
import { showStatusBox } from "@/store/actions";
import { connect } from "react-redux";

function TranslateBox({ wNum, hNum, unitWidth }) {
  const [selectedOption, setSelectedOption] = useState("zh");
  const childTranslate = createRef(null);
  useEffect(() => {
  }, []);
  const handleTranslate = () => {
    childTranslate.current.handleTranslate();
  };
  return (
    <>
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
    </>
  );
}
const mapDispatchToProps = {
  showStatusBox,
};

export default connect(null, mapDispatchToProps)(TranslateBox);