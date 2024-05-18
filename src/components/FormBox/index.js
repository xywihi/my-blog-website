import React, { useEffect } from "react";
import styles from "./index.module.less";
export default function FormBox({ formTitle, handleSubmit, handleCancle,handleResetFormItemData, children }) {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className={`${styles.formBox} pa24 bg1 borderR12 flexC`}>
      <form onSubmit={(e,values)=>handleSubmit(e,values)}>
        <p className="fontB font16 maB12">{formTitle}</p>
        {children}
        <div className="maT24">
          <button className="bg_blue maH6" type="submit">
            提交
          </button>
          <button className="bg1 maH6 border border_black colorBlack" type="reset" onClick={handleResetFormItemData}>
            重置
          </button>
          <button className="bg4 maH6" type="button" onClick={handleCancle}>
            取消
          </button>
        </div>
      </form>
    </div>
  );
  // return React.cloneElement(children, { className: "mask-element" });
}
