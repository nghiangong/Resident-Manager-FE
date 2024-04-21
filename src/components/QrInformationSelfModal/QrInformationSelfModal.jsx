import React, { useEffect, useState } from "react";
import { Modal, Form, Button, message } from "antd";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./QrInformationSelfModal.scss";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { createExpireDate, isExpired } from "../../utils/Format";
import { userRequest } from "../../utils/requestMethod";
import moment from "moment";
export const QrInformationSelfModal = ({ isOpen, setIsOpen }) => {
  const auth = useAuthUser();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  dayjs.extend(customParseFormat);
  //   const onChangeTime = (time, timeString) => {
  //     console.log(time, timeString);
  //   };

  //   const onChangeDate = (date, dateString) => {
  //     console.log(date, dateString);
  //   };
  const handleOk = () => {
    form.resetFields();
    setIsOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };

  const onFinish = async (values) => {
    const expireDate = createExpireDate(values.expireTime, values.expireDay);
    form.resetFields();
    setIsOpen(false);
    console.log(values);
    try {
      if (!isExpired(expireDate)) {
        const res = await userRequest.post("/user/createQr", {
          userId: auth.id,
          name: auth.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          expireDate: expireDate,
          gender: auth.gender,
          resident: true,
        });
        navigate("/create-qr", { state: res.data });
      } else {
        message.error("Thời gian tạo QR code đã hết hạn");
      }
      //   <Link to="/create-qr" userInfo={res.data} />;
    } catch (error) {
      message.error("Tạo Qr không thành công");
    }
  };
  return (
    <div className="qrInformationSelfModalContainer">
      <Modal
        title="Điền thông tin Qr"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="qrInformationSelf"
          onFinish={onFinish}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Form.Item
            name="expireTime"
            label="Thời điểm hết hạn Qr"
            rules={[
              {
                required: true,
                message: "Hãy điền thời gian!",
              },
            ]}
          >
            <TimePicker
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              //   onChange={onChangeTime}
              defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            />
          </Form.Item>
          <Form.Item
            name="expireDay"
            label="Ngày hết hạn Qr"
            rules={[
              {
                required: true,
                message: "Hãy điền ngày!",
              },
            ]}
          >
            <DatePicker
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              //   onChange={onChangeDate}
              disabledDate={(current) => {
                return (
                  moment().add(-1, "days") >= current ||
                  moment().add(1, "month") <= current
                );
              }}
            />
          </Form.Item>
          <Form.Item
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button type="primary" htmlType="submit">
              Tạo Qr
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
