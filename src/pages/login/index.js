import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import styles from "./index.module.less";
import FormBox from "@/components/FormBox";
import { handleLogin, showStatusBox } from "@/store/actions";
import { login,register } from "@/http/require";
import { LocalStorage } from "@/util";
import { useNavigate } from "react-router-dom";
const newLocalStorage = new LocalStorage();
function Login({ logged, handleLogin, showStatusBox }) {
  const [type, setType] = useState(true);
  const [formData, setFormData] = useState({
    username: {
      value: "",
      required: true,
    },
    password: {
      value: "",
      required: true,
    },
    confirmPassword: {
      value: "",
      required: true,
    },
    email: {
      value: "",
      required: true,
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    document
      .getElementById("togglePassword")
      .addEventListener("change", function () {
        if (this.checked) {
          document.getElementById("password").type = "text";
        } else {
          document.getElementById("password").type = "password";
        }
      });
  });
  // const dispatch = useDispatch();
  // const user = useSelector(state => state.user);
  // const { userInfo } = user;
  let handleSubmit = (e,type) => {
    e.preventDefault();
    switch (type) {
      case true:
        login({
          username: formData.username.value,
          password: formData.password.value,
        }).then((res) => {
          if (res?.code === 200) {
            handleLogin({
              status: true,
              userInfo: res.userInfo,
              token: res.token,
            });
            newLocalStorage.set("token", "Ber " + res.token);
            navigate("/");
          } else {
            showStatusBox({
              show: true,
              // message:"网络异常，请稍后再试",
              message: res?.error,
              status: "warning",
            });
          }
        });
        break;
      case false:
        register({
          email: formData.email.value,
          password: formData.password.value,
        }).then((res) => {
          if (res?.code === 200) {
            setType(true);
          } else {
            showStatusBox({
              show: true,
              // message:"网络异常，请稍后再试",
              message: res?.error,
              status: "warning",
            });
          }
        });
        break;

      default:
        break;
    }
  };
  const handleCancle = () => {
    setFormData({
      username: {
        value: "",
        required: true,
      },
      password: {
        value: "",
        required: true,
      },
      confirmPassword: {
        value: "",
        required: true,
      },
      email: {
        value: "",
        required: true,
      },
    });
  };
  const handleResetFormItemData = (key) => {};
  return (
    <div className={styles.loginBox}>
      <div className={``}>
        <div className={`${styles.formBox} flexC`}>
          <div>
            <FormBox
              formTitle="登陆注册"
              handleSubmit={(e) => handleSubmit(e, type)}
              formType="memorandum"
              handleCancle={handleCancle}
              handleResetFormItemData={handleResetFormItemData}
              subBtn={type ? "登录" : "注册"}
              haveResetBtn={false}
            >
              {type ? (
                <>
                  <div className="form_item_box maB12">
                    <label className="colorGray" htmlFor="username">
                      用户名
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="username@example.com"
                      className="border widthFull pa12 maT6"
                      required={formData.password.required}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          username: {
                            ...formData.username,
                            value: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="form_item_box maB12 relative">
                    <label className="colorGray" htmlFor="password">
                      密码
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="用户密码"
                      className={`border widthFull pa12 maT6 ${styles.passwordInput}`}
                      required={formData.password.required}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          password: {
                            ...formData.password,
                            value: e.target.value,
                          },
                        });
                      }}
                    />
                    <label
                      htmlFor="togglePassword"
                      className={styles.togglePassword}
                    ></label>
                    <input
                      type="checkbox"
                      id="togglePassword"
                      style={{ display: "none" }}
                      className={styles.togglePasswordChecker}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form_item_box maB12">
                    <label className="colorGray" htmlFor="email">
                      邮箱地址
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="username@example.com"
                      className="border widthFull pa12 maT6"
                      required={formData.email.required}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          email: {
                            ...formData.email,
                            value: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="form_item_box maB12 relative">
                    <label className="colorGray" htmlFor="re_password">
                      密码
                    </label>
                    <input
                      type="password"
                      id="re_password"
                      name="re_password"
                      placeholder="用户密码"
                      className={`border widthFull pa12 maT6 ${styles.passwordInput}`}
                      required={formData.password.required}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          password: {
                            ...formData.password,
                            value: e.target.value,
                          },
                        });
                      }}
                    />
                    <label
                      htmlFor="togglePassword"
                      className={styles.togglePassword}
                    ></label>
                    <input
                      type="checkbox"
                      id="togglePassword"
                      style={{ display: "none" }}
                      className={styles.togglePasswordChecker}
                    />
                  </div>
                  <div className="form_item_box maB12 relative">
                    <label className="colorGray" htmlFor="re_confirmPassword">
                      确认密码
                    </label>
                    <input
                      type="password"
                      id="re_confirmPassword"
                      name="re_confirmPassword"
                      placeholder="确认密码"
                      className={`border widthFull pa12 maT6 ${styles.passwordInput}`}
                      required={formData.confirmPassword.required}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          confirmPassword: {
                            ...formData.confirmPassword,
                            value: e.target.value,
                          },
                        });
                      }}
                    />
                    <label
                      htmlFor="togglePassword"
                      className={styles.togglePassword}
                    ></label>
                    <input
                      type="checkbox"
                      id="togglePassword"
                      style={{ display: "none" }}
                      className={styles.togglePasswordChecker}
                    />
                  </div>
                </>
              )}
            </FormBox>
            <p
              className="font14 colorWhite maT12 icon_hover cursor textCenter"
              onClick={() => {
                handleCancle();
                setType(!type);
              }}
            >
              {type ? "新用户注册" : "登录账号"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  logged: state.reducer.logged,
});
const mapDispatchToProps = {
  handleLogin,
  showStatusBox,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
