import { MoreOutlined } from "@ant-design/icons";
import "./Notification.scss";
import { formatDateTimeDetail } from "../../utils/Format";
import React, { useContext, useState } from "react";
import { Button, Popover, message } from "antd";
import { userRequest } from "../../utils/requestMethod";
import { UpdateNotificationContext } from "../../pages/notificationMobile/NotificationMobile";

export const Notification = ({ history }) => {
  const { update, setUpdate } = useContext(UpdateNotificationContext);
  const [open, setOpen] = useState(false);
  const hide = async () => {
    try {
      const res = await userRequest.put(`/histories/${history.id}`, {
        ...history,
        readStatus: true,
      });
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      message.error("Đánh dấu đã đọc thất bại");
    }
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const backgroundColor = history.readStatus
    ? "var(--color-off-white)"
    : "var(--color-cyan)";
  return (
    <div
      className="notificationContainer"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="information">
        <span>Thời gian: {formatDateTimeDetail(history.date)}</span>
        <span>Tên người: {history.name}</span>
        <span>Yêu cầu: {history.resident ? "Dân cư" : "Khách"}</span>
        <span>Ghi chú: {history.note}</span>
        <span>Tên cổng ra vào: {history.gate.name}</span>
      </div>
      <div className="setting">
        <Popover
          title={<a onClick={hide}>Đánh dấu đã đọc</a>}
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <MoreOutlined style={{ fontSize: "30px" }} />
        </Popover>
      </div>
    </div>
  );
};
