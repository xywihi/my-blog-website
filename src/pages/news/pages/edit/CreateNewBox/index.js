import React from "react";
import styles from "./index.module.less";
// import AceEditorBox from "@/components/AceEditorBox";
import Image from "@/components/AceEditorBox";
import OwnCKEditor from "@/components/CKEEditorBox";
import { useNavigate } from "react-router-dom";
import "./index.less";
const CreateNewBox = ({ handleSubmit }) => {
  const [code, setCode] = React.useState("");
  const navigate = useNavigate();
  const editorItem = [
    // <div className={styles.aceEditorBox}>
    //   <AceEditorBox setCode={setCode} height="200px" />
    // </div>,
    <Image src={null} height="320ox" width="100%" />,
  ];
  return (
    <div>
      <h2 className="maB24">创建新的日记</h2>
      <h3 className="maB12">标题</h3>
      <input
        className={`${styles.titleBox} paH12 paV6 borderR6 border border_gray`}
        type="text"
        placeholder="请输入标题"
      />
      <h3 className="maB12 maT24">内容</h3>
      <OwnCKEditor />
      {editorItem.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
      <div className="maT24">
        <button className="bg_blue maH6" onClick={handleSubmit}>
          发布
        </button>
        <button className="bg4 maH6" type="button" onClick={()=>navigate('/news/person')}>
          取消
        </button>
      </div>
    </div>
  );
};

export default CreateNewBox;
