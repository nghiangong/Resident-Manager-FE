import { BellOutlined, RiseOutlined } from "@ant-design/icons";
import "./NavMobile.scss";
import React, { useEffect, useState } from "react";
import { Badge, message } from "antd";
import { Link, useLocation } from "react-router-dom";
import { userRequest } from "../../utils/requestMethod";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export const NavMobile = ({ update }) => {
  const location = useLocation();
  const [unread, setUnread] = useState(null);
  const auth = useAuthUser();
  const getUnread = async () => {
    try {
      const res = await userRequest.get(`/histories/unread?userId=${auth.id}`);
      setUnread(res.data);
    } catch (error) {
      console.log(error);
      message.error("Không lấy được số thông báo chưa đọc");
    }
  };
  useEffect(() => {
    getUnread();
  }, [update]);
  return (
    <div className="navMobileContainer">
      <Link
        to="/home-mobile"
        className={`subNav ${
          location.pathname === "/home-mobile" ? "active" : ""
        }`}
      >
        <RiseOutlined />
        <span>Trang chủ</span>
      </Link>
      <Link
        to="/notification-mobile"
        className={`subNav ${
          location.pathname === "/notification-mobile" ? "active" : ""
        }`}
      >
        <Badge count={unread}>
          <BellOutlined
            className={`${
              location.pathname === "/notification-mobile" ? "active" : ""
            }`}
          />
        </Badge>
        <span>Thông báo</span>
      </Link>
    </div>
  );
};
