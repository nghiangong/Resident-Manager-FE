import "./Register.scss";
import React, { useEffect, useState } from "react";
import { AutoComplete, message } from "antd";
import bg from "../../image/register_background.jpg";
import { Button, DatePicker, Input, Select, Form } from "antd";
import { publicRequest } from "../../utils/requestMethod";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [houses, setHouses] = useState([]);
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const getHouses = async () => {
    try {
      const res = await publicRequest.get("/houses");
      setHouses(res.data);
    } catch (error) {
      message.error("Lấy thông tin tòa nhà thất bại");
    }
  };
  useEffect(() => {
    getHouses();
  }, []);
  useEffect(() => {
    // Biến đổi dữ liệu từ mảng houses để tạo options
    const newOptions = houses.map((house) => ({
      value: `${house.name} - Địa chỉ ${house.address}`,
      id: house.id,
    }));
    setOptions(newOptions);
  }, [houses]);
  const handleSelectHouse = (value, option) => {
    setSelectedHouseId(option.id); // Lưu ID của nhà được chọn khi người dùng chọn từ danh sách
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
        gender: values.gender,
        date: values.date,
        image: image1,
        ownId: 0,
        idCard: values.idCard,
        createQrPermission: true,
        houseId: selectedHouseId,
        roleIds: [2],
      });
      message.success(res.data.message);
      navigate("/");
    } catch (error) {
      message.error(error.response.data.apierror.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="registerContainer">
      <img className="background" src={bg} alt="" />
      <div className="registerContentContainer">
        <h3>Tạo tài khoản</h3>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="registerForm">
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Hãy điền họ và tên!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
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
            <Form.Item
              label="CCCD"
              name="idCard"
              rules={[
                {
                  required: true,
                  message: "Hãy điền căn cước công dân!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên nhà"
              name="houseId"
              rules={[
                {
                  required: true,
                  message: "Hãy điền tên nhà!",
                },
              ]}
            >
              <AutoComplete
                options={options}
                placeholder="Tên nhà"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={handleSelectHouse}
              />
            </Form.Item>
          </div>
          <Form.Item className="registerButton">
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
