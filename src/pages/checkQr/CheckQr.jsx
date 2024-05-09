import "./CheckQr.scss";
import logo from "../../image/logo-Vinhomes.png";
import { Topbar } from "../../components/topbar/Topbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, message, notification } from "antd";
import { userRequest } from "../../utils/requestMethod";
import {
  formatDateTimeDetail,
  getCurrentDateTimeFormatted,
} from "../../utils/Format";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
export const CheckQr = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [dataObject, setDataObject] = useState(null);
  const [qrCreatorName, setQrCreatorName] = useState(null);
  const auth = useAuthUser();
  const textAreaInput = useRef(null);

  useEffect(() => {
    if (textAreaInput.current) {
      // or, if Input component in your ref, then use input property like:
      // textAreaInput.current.input.focus();
      textAreaInput.current.focus();
    }
  }, [textAreaInput]);
  const handleAllowAccess = async () => {
    try {
      const res = await userRequest.post("/history", {
        qrCreatorId: dataObject.userId,
        ...dataObject,
        gateId: auth.gate.id,
        date: getCurrentDateTimeFormatted(),
      });
      message.success("Thêm vào lịch sử thành công");
      // await userRequest.post(`/clients/${registrationToken}`, {
      //   receiverId: dataObject.userId,
      //   title: "Thông báo",
      //   message: dataObject.resident
      //     ? "Bạn vừa vào cổng"
      //     : "Khách của bạn đã đến",
      // });
      form.resetFields();
      setDataObject(null);
      if (textAreaInput.current) {
        // or, if Input component in your ref, then use input property like:
        // textAreaInput.current.input.focus();
        textAreaInput.current.focus();
      }
    } catch (error) {
      console.log(error);
      message.error("Thêm vào lịch sử thất bại");
    }
  };
  const onFinish = async (values) => {
    try {
      const res = await userRequest.post(
        "/user/verifyQr",
        JSON.parse(values.info)
      );
      message.success(res.data.message);
      if (res.status === 200) {
        setDataObject(JSON.parse(values.info));
      }
    } catch (error) {
      console.log(error);
      if (error.response === undefined) {
        message.error("Nội dung QR không hợp lệ");
      } else {
        message.error(error.response.data.apierror.message);
      }
    }
  };
  const getQrCreator = async () => {
    try {
      if (dataObject !== null) {
        const res = await userRequest.get(`/users/${dataObject.userId}`);
        setQrCreatorName(res.data.name);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQrCreator();
  }, [dataObject]);
  return (
    <div className="webInterfaceContainer">
      <img className="logoWeb" src={logo} alt="logo" width={150} height={150} />
      <Topbar />
      <Sidebar />
      <div className="contentWebContainer">
        <div className="contentWeb">
          <div className="checkQrTitle">
            <h4>Kiểm tra QR</h4>
          </div>
          <Form
            form={form}
            name="checkQr"
            onFinish={onFinish}
            style={{
              marginBlockStart: "1em",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Form.Item
              style={{ width: "100%" }}
              label="Nội dung QR"
              name="info"
            >
              <TextArea rows={4} ref={textAreaInput} />
            </Form.Item>
            <Form.Item
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="primary" htmlType="submit">
                Kiểm tra
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="contentWeb">
          <div className="allowButton">
            <h4>Thông tin QR</h4>
            {dataObject && (
              <Button type="primary" onClick={handleAllowAccess}>
                Cho phép vào
              </Button>
            )}
          </div>
          <div className="checkedQrInformation">
            <div className="eachInfo">
              <h4>Tên người vào:</h4>
              {dataObject && <span>{dataObject.name}</span>}
            </div>
            <div className="eachInfo">
              <h4>Giới tính:</h4>
              {dataObject && <span>{dataObject.gender ? "Nam" : "Nữ"}</span>}
            </div>
            <div className="eachInfo">
              <h4>Tên người cung cấp Qr:</h4>
              {dataObject && <span> {qrCreatorName}</span>}
            </div>
            <div className="eachInfo">
              <h4>Biển số xe: </h4>
              {dataObject && <span>{dataObject.licensePlate}</span>}
            </div>
            <div className="eachInfo">
              <h4>Ghi chú: </h4>
              {dataObject && <span>{dataObject.note}</span>}
            </div>
            <div className="eachInfo">
              <h4>Yêu cầu vào: </h4>
              {dataObject && (
                <span>{dataObject.resident ? "Cư dân" : "Khách"}</span>
              )}
            </div>
            <div className="eachInfo">
              <h4>Thời gian hết hạn Qr: </h4>
              {dataObject && (
                <span>{formatDateTimeDetail(dataObject.expireDate)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
