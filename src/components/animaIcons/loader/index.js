import React from "react";
import "./style.less";
const Loader = ({ children, ...props }) => {
  return (
    <div className="loaderBox">
      {children}
      <div className="loader loader-3" {...props}>
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
    </div>
  );
};

export default Loader;
