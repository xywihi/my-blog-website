import React, { useEffect } from "react";
import styles from "./index.module.less";
export default function FormBox({ formTitle, handleSubmit, handleCancle,handleResetFormItemData,haveResetBtn,subBtn, children }) {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className={`${styles.formBox} pa24 borderR12 flexC`}>
      <form onSubmit={handleSubmit}>
        <p className="fontB font16 maB12">{formTitle}</p>
        {children}
        <div className="maT24 flexC">
          <button className="bg_blue maH6" type="submit">
            {subBtn || '提交'}
          </button>
          {haveResetBtn && <button className="maH6 border border_black colorBlack" type="reset" onClick={handleResetFormItemData}>
            重置
          </button>}
          <button className="bg4 maH6" type="button" onClick={handleCancle}>
            取消
          </button>
        </div>
      </form>
    </div>
  );
  // return React.cloneElement(children, { className: "mask-element" });
}
