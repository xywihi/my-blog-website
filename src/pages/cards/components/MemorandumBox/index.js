import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { addCircle, trash } from "ionicons/icons";
import styles from "./index.module.less";
import MaskElement from "@/components/MaskElement";
import FormBox from "@/components/FormBox";
import { connect } from "react-redux";
import { handleChangePlans } from "@/store/actions";
import { debug } from "openai/core.mjs";
function MemorandumBox({ plans, handleChangePlans, handleChangeCardName }) {
  const [fromItemData, setFromItemData] = useState({
    name: { value: "", required: true },
    content: { value: "", required: true },
    status: { value: 0, required: true },
    startTime: { value: new Date().toISOString().slice(0, 16), required: true },
    endTime: { value: new Date().toISOString().slice(0, 16), required: true },
  });
  const [showForm, setShowForm] = useState(false);
  const [plansDisplay, setPlansDisplay] = useState([]);
  useEffect(() => {
    let newPlansDisplay = Array(12)
      .fill(0)
      .map((item, index) => []);
    plans &&
      plans.forEach((item, index) => {
        let month = new Date(item.startTime).getMonth();
        newPlansDisplay[month].push(item);
      });
    setPlansDisplay(newPlansDisplay);
  }, [plans]);
  useEffect(() => {
    handleChangeCardName(showForm ? "memorandumBox" : null);
  }, [showForm]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let newPlan = Object.keys(fromItemData).reduce((acc, cur) => {
      acc[cur] =
        cur == "startTime" || cur == "endTime"
          ? new Date(fromItemData[cur].value).getTime()
          : fromItemData[cur].value;
      return acc;
    }, {id:plans.length});
    handleChangePlans([newPlan, ...plans]);
    setShowForm(false);
    handleResetFormItemData()
  };

  const handleResetFormItemData = () => {
    setFromItemData({
      name: { value: "", required: true },
      content: { value: "", required: true },
      status: { value: 0, required: true },
      startTime: { value: new Date().toISOString().slice(0, 16), required: true },
      endTime: { value: new Date().toISOString().slice(0, 16), required: true },
    });
  };
  const handleRemovePlan = (id) => {
    const newPlans = plans.filter((item, i) => item.id != id);
    debugger
    handleChangePlans(newPlans);
  };
  return (
    <div className={`${styles.memorandumBox} heightFull`}>
      <h3 className="name maB12 flexB widthFull">
        <span>备忘录</span>{" "}
        <div className="cursor icon_hover" onClick={() => setShowForm(true)}>
          <IonIcon icon={addCircle} size="36px"></IonIcon>
        </div>
      </h3>
      <ul className={`${styles.listBox} scrollbarBox scrollbarBox_hidden`}>
        {plansDisplay.map((item, index) => (
          item.length>0 &&
          <li className={styles.list_years}>
            <div className="flexB">
              {/* <h2 className={`${styles.year} fontB maB12`}>2024</h2> */}
              <h4 className={`${styles.mouth} maB6 fontB colorGray`}>{index+1}月</h4>
            </div>
            <ul className={`${styles.dayList} maB6`}>
              {item.map((it, i) => (
                <li className="pa12 bg3 borderR12">
                  <div className="flexB">
                    <h4 className="fontB maB6">{it.name}</h4>
                    <div
                      className="cursor icon_hover colorGray"
                      onClick={() => handleRemovePlan(it.id)}
                    >
                      <IonIcon icon={trash} size="36px"></IonIcon>
                    </div>
                  </div>
                  <p className="font16 colorGray">{it.content}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}

        {plans.length == 0 && (
          <li className={`${styles.list_years} maV24 font14 colorGray`}>
            <div className="flexC">
              <h4 className="fontB maB6">暂无备忘录</h4>
            </div>
          </li>
        )}
      </ul>
      {showForm && (
        <div className={`${styles.formBox} flexC`}>
          <MaskElement />

          <FormBox
            formTitle="新建备忘录"
            handleSubmit={handleSubmit}
            formType="memorandum"
            handleCancle={() => setShowForm(false)}
            handleResetFormItemData={handleResetFormItemData}
          >
            <div className={` `}>
              <div className="form_item_box maB12">
                <label className="colorGray">标题</label>
                <input
                  name="name"
                  type="text"
                  placeholder="备忘录标题"
                  className="border widthFull pa12 maT6"
                  {...fromItemData.name}
                  onChange={(e) => {
                    setFromItemData({
                      ...fromItemData,
                      name: {
                        ...fromItemData.name,
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="form_item_box maB12">
                <label className="colorGray">内容</label>
                <textarea
                  name="content"
                  className="border widthFull pa12 maT6"
                  placeholder="备忘录内容"
                  {...fromItemData.content}
                  onChange={(e) => {
                    setFromItemData({
                      ...fromItemData,
                      content: {
                        ...fromItemData.content,
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="form_item_box maB12">
                <label className="colorGray">状态</label>
                <select
                  name="status"
                  {...fromItemData.status}
                  onChange={(e) => {
                    setFromItemData({
                      ...fromItemData,
                      status: {
                        ...fromItemData.status,
                        value: e.target.value,
                      },
                    });
                  }}
                  className="border widthFull pa12 maT6"
                >
                  <option value="0">未完成</option>
                  <option value="1">已完成</option>
                  <option value="2">已取消</option>
                  <option value="3">已过期</option>
                </select>
              </div>
              <div className="form_item_box maB12 maT6">
                <label className="colorGray">开始时间</label>
                <input
                  name="startTime"
                  type="datetime-local"
                  className="border widthFull pa12 maT6"
                  {...fromItemData.startTime}
                  onChange={(e) => {
                    setFromItemData({
                      ...fromItemData,
                      startTime: {
                        ...fromItemData.startTime,
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="form_item_box maB12">
                <label className="colorGray">结束时间</label>
                <input
                  name="endTime"
                  type="datetime-local"
                  className="border widthFull pa12 maT6"
                  {...fromItemData.endTime}
                  onChange={(e) => {
                    setFromItemData({
                      ...fromItemData,
                      endTime: {
                        ...fromItemData.endTime,
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </FormBox>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  plans: state.reducer.plans,
});

const mapDispatchToProps = {
  handleChangePlans,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemorandumBox);
