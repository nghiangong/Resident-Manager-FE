import React, { useEffect, useState } from "react";
import { Modal, Form, Button, message, Input } from "antd";
import { DatePicker, Select } from "antd";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { publicRequest, userRequest } from "../../utils/requestMethod";
export const AddMemberModal = ({ isOpen, setIsOpen, update, setUpdate }) => {
  const auth = useAuthUser();
  const [form] = Form.useForm();
  const handleOk = () => {
    form.resetFields();
    setIsOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };
  const onFinish = async (values) => {
    try {
      let image1;
      values.gender
        ? (image1 =
            "https://cdn5.vectorstock.com/i/1000x1000/73/84/young-man-model-avatar-character-vector-19077384.jpg")
        : (image1 =
            "https://cdn4.vectorstock.com/i/1000x1000/86/88/woman-female-avatar-character-vector-11708688.jpg");
      const res = await publicRequest.post("/signup", {
        name: values.name,
        phone: values.phone,
        username: values.username,
        password: values.password,
        email: values.email,
        image: image1,
        gender: values.gender,
        date: values.date,
        ownId: auth.id,
        idCard: values.idCard,
        createQrPermission: false,
        houseId: auth.house.id,
        roleIds: [2],
      });
      message.success(res.data.message);
      setUpdate(!update);
    } catch (error) {
      message.error("Thêm người dùng không thành công");
    }
    form.resetFields();
    setIsOpen(false);
    console.log(values);
  };
  return (
    <div className="addMemberModalContainer">
      <Modal
        title="Điền thông tin thành viên"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="addMember"
          onFinish={onFinish}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[
              {
                required: true,
                message: "Hãy điền tên!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Hãy điền số điện thoại!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Tên đăng nhập"
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
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Hãy điền mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender" initialValue={true}>
            <Select>
              <Select.Option value={true}>Nam</Select.Option>
              <Select.Option value={false}>Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ngày sinh" name="date">
            <DatePicker
              className="birthday"
              style={{ display: "flex", justifyContent: "center" }}
            />
          </Form.Item>
          <Form.Item label="CCCD" name="idCard">
            <Input />
          </Form.Item>
          <Form.Item
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button type="primary" htmlType="submit">
              Thêm thành viên
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
