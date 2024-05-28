import React from "react";
import styles from "./index.module.less";
import {CKEditor} from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor';  // 引入自定义的CKEditor5
import MyUploadAdapter from "./MyUploadAdapter";
const CKEEditorBox = ({ getData,data }) => {
  return (
    <div className={`${styles.textareaBox}`}>
        <CKEditor
          editor={CustomEditor}
          placeholder="请输入内容"
          data={data}
          onInit={(editor) => {
            // console.log("Editor is ready to use!***********************", editor);
          }}
          onChange={(event, editor) => getData(editor.getData())}
          // onBlur={(event, editor) => {
          //   console.log("Blur.", editor);
          // }}
          // onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
          // }}
          config={{
            extraPlugins: [MyCustomUploadAdapterPlugin],
            placeholder: "请输入内容",
          }}
        />
      </div>
  );
};


export default CKEEditorBox;

function MyCustomUploadAdapterPlugin( editor ) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      return new MyUploadAdapter( loader );
  };
}