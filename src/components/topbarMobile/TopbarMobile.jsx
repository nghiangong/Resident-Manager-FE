import logo from "../../image/logo-Vinhomes.png";
import { SunOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar, Space } from "antd";
import "./TopbarMobile.scss";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { getCurrentDate } from "../../utils/Format";

export const TopbarMobile = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const handleSignOut = () => {
    signOut();
    navigate("/");
  };
  const items = [
    {
      key: "1",
      danger: true,
      label: "Đăng xuất",
      onClick: handleSignOut,
    },
  ];
  return (
    <div className="topbarMobileContainer">
      <div className="iconAvatar">
        <img src={logo} alt="logo" width={100} height={100} />
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Avatar className="avatar" size="large" icon={<UserOutlined />} />
          </a>
        </Dropdown>
      </div>
      <div className="dateMonth">
        <SunOutlined />
        <h5>{getCurrentDate()}</h5>
      </div>
    </div>
  );
};
