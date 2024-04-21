import logo from "../../image/logo-Vinhomes.png";
import React, { useContext, useState } from "react";
import background from "../../image/vinhome_background.png";
import "./Login.scss";
import { Input, Radio, Space, message } from "antd";
import { Button, Form } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { publicRequest } from "../../utils/requestMethod.jsx";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Login = () => {
  const [value, setValue] = useState(1);
  const navigate = useNavigate();
  const signIn = useSignIn();
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const login = async (values) => {
    try {
      const res = await publicRequest.post("/signin", {
        username: values.username,
        password: values.password,
      });

      if (res.data.deletedAt === null) {
        if (res.data.acceptedStatus) {
          const commonUserState = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            acceptedStatus: res.data.acceptedStatus,
            image: res.data.image,
            date: res.data.date,
            ownId: res.data.ownId,
            idCard: res.data.idCard,
            createQrPermission: res.data.createQrPermission,
            roles: res.data.roles,
            phone: res.data.phone,
            username: res.data.username,
            house: res.data.house,
            gate: res.data.gate,
            gender: res.data.gender,
          };

          if (res.data.roles.includes("ROLE_USER") && value === 2) {
            signIn({
              auth: {
                token: res.data.token,
                type: "Bearer",
              },
              userState: commonUserState,
            });
            return navigate("/home-mobile");
          } else if (
            res.data.roles.includes("ROLE_GATEKEEPER") &&
            value === 3
          ) {
            signIn({
              auth: {
                token: res.data.token,
                type: "Bearer",
              },
              userState: {
                ...commonUserState,
                currentRole: value,
              },
            });
            return navigate("/check-qr");
          } else if (res.data.roles.includes("ROLE_ADMIN") && value === 1) {
            signIn({
              auth: {
                token: res.data.token,
                type: "Bearer",
              },
              userState: {
                ...commonUserState,
                currentRole: value,
              },
            });
            return navigate("/dashboard");
          } else {
            message.error("Không đúng vai trò");
          }
        } else {
          message.error("Tài khoản chưa được phê duyệt");
        }
      } else {
        message.error("Tài khoản không tồn tại");
      }
    } catch (error) {
      console.log(error);
      message.error("Tài khoản hoặc mật khẩu sai");
    }
  };

  const onFinish = (values) => {
    login(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="loginContainer">
      <div className="loginHeader">
        <img src={logo} alt="logo" width={150} height={150} />
      </div>
      <div className="loginInterface">
        <img src={background} alt="background" width={550} height={550} />
        <div className="loginFormContainer">
          <div className="loginForm">
            <div className="loginIcon">
              <FontAwesomeIcon icon={faUser} />
              <h4>ĐĂNG NHẬP</h4>
            </div>
            <div className="loginRadio">
              <h6>Vui lòng chọn vai trò đăng nhập</h6>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={1}>Admin</Radio>
                  <Radio value={2}>Cư dân</Radio>
                  <Radio value={3}>Bảo vệ</Radio>
                </Space>
              </Radio.Group>
            </div>
            <Form
              className="loginInput"
              name="login"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên đăng nhập!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền mật khẩu!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <div className="loginButtonContainer">
                <Form.Item className="loginButton">
                  <Button type="primary" htmlType="submit">
                    Đăng nhập
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <span className="register">
              Để trở thành cư dân, hãy{" "}
              <span>
                <Link to={"/register"} className="subRegister">
                  đăng ký
                </Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
