import React, { useEffect } from "react";
import styles from "./index.module.less";
// import AceEditorBox from "@/components/AceEditorBox";
import Image from "@/components/AceEditorBox";
import OwnCKEditor from "@/components/CKEEditorBox";
import { useNavigate, useParams } from "react-router-dom";
import "./index.less";
import { createArticle,updateArticle } from "@/http/require";
import { connect } from "react-redux";
import { showStatusBox } from "@/store/actions";
const CreateNewBox = ({newsData, showStatusBox }) => {
  const [code, setCode] = React.useState("");
  const [formData, setFormData] = React.useState({Title: "", Content: "", Type: ""});
  const navigate = useNavigate();
  const {id} = useParams();

  const editorItem = [
    // <div className={styles.aceEditorBox}>
    //   <AceEditorBox setCode={setCode} height="200px" />
    // </div>,
    <Image src={null} height="320ox" width="100%" />,
  ];
  useEffect(() => {
    if(newsData.length>0 && id != "create"){
      let currentNews = newsData.filter((item) => item.ID == id)[0]
      setFormData(currentNews);
    } 
  },[])
  const handleSubmit = () => {
    if (formData.Title === "" || formData.Content === "") {
      showStatusBox({
        show: true,
        message: "标题和内容不能为空",
        status: "warning",
      });
      return;
    }
    if(id!='create'){
      updateArticle({
        ...formData,
      }).then((res) => {
        if(res.code===200){
          showStatusBox({
            show: true,
            message: "更新成功",
            status: "success",
          });
          // navigate.back();
          // 返回上一页
          window.history.back();
        }
      });
    }else{
      createArticle({
        ...formData,
        author: "anln@gmail.com",
        id: 0,
      }).then((res) => {
        if(res.code===200){
          showStatusBox({
            show: true,
            message: "创建成功",
            status: "success",
          });
          window.history.back();
        }
        
      });
    }
  };
  return (
    <div>
      <h2 className="maB24">创建新的日记</h2>
      <h3 className="maB12">标题</h3>
      <input
        className={`${styles.titleBox} paH12 paV6 borderR6 border border_gray`}
        type="text"
        placeholder="请输入标题"
        onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
        value={formData?.Title}
      />
      <div className="maV12">
        <h3 className="maB12">类型</h3>
        <select className="pa6" onChange={(e) => setFormData({ ...formData, Type: e.target.value })} value={formData?.Type}>
          <option value="0">日记</option>
          <option value="1">笔记</option>
          <option value="2">其他</option>
        </select>
      </div>

      <h3 className="maB12 maT24">内容</h3>
      <OwnCKEditor
        getData={(data) => setFormData(old=>{
          return {...old,Content:data}
        })}
        data={formData?.Content}
      />
      {editorItem.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
      <div className="maT24">
        <button className="bg_blue maH6" onClick={handleSubmit}>
          发布
        </button>
        <button
          className="bg4 maH6"
          type="button"
          onClick={() => history.back()}
        >
          取消
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  newsData: state.news.newsData,
});
const mapDispatchToProps = {
  showStatusBox,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewBox);
