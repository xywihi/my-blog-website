import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

const AceEditorBox = ({ code, setCode,height }) => {
  const handleChangeCode = (newValue) => {
    setCode(newValue);
    console.log(newValue);
  }
  return (
    <AceEditor
      mode="javascript"
      theme="github"
      onChange={handleChangeCode}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      value={code}
      width="100%"
      height={height}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      wrapEnabled={true}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        useWorker: false,
        // readOnly:true
      }}
    />
  );
};


export default AceEditorBox;