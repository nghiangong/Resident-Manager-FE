import {
  Button,
  Form,
  Modal,
  message,
  Input,
  Select,
  DatePicker,
  AutoComplete,
} from "antd";
import { useState, useEffect, useContext } from "react";
import { publicRequest, userRequest } from "../../utils/requestMethod";
import { UpdateGateContext } from "../../pages/gateKeeper/GateKeeper";

export const AddGateKeeperModal = () => {
  const { update, setUpdate } = useContext(UpdateGateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedGateId, setSelectedGateId] = useState(null);
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);
  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const getRoles = async () => {
    try {
      const res = await userRequest.get("/roles");
      const mappedRoles = res.data.map((role) => ({
        label: role.name,
        value: role.id,
      }));
      setRoleOptions(mappedRoles);
    } catch (error) {
      message.error("Lấy thông tin vai trò thất bại");
    }
  };

  const getGates = async () => {
    try {
      const res = await userRequest.get("/gates");
      const newOptions = res.data.map((gate) => ({
        value: `${gate.name} - Địa chỉ ${gate.address}`,
        id: gate.id,
      }));
      setOptions(newOptions);
    } catch (error) {
      message.error("Lấy thông tin cổng thất bại");
    }
  };

  const handleSelectGate = (value, option) => {
    console.log(`selected gateId ${option.id}`);
    setSelectedGateId(option.id); // Lưu ID của nhà được chọn khi người dùng chọn từ danh sách
  };

  const handleChange = (values) => {
    console.log(`selected role ${values}`);
    setSelectedRoleIds(values);
  };

  useEffect(() => {
    getGates();
    getRoles();
  }, []);

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinish = async (values) => {
    try {
      let image1;
      values.gender
        ? (image1 =
            "https://cdn5.vectorstock.com/i/1000x1000/73/84/young-man-model-avatar-character-vector-19077384.jpg")
        : (image1 =
            "https://cdn4.vectorstock.com/i/1000x1000/86/88/woman-female-avatar-character-vector-11708688.jpg");
      const res = await userRequest.post("/user", {
        ...values,
        image: image1,
        gateId: selectedGateId,
        roleIds: selectedRoleIds,
      });
      message.success("Thêm bảo vệ thành công");
      setUpdate(!update);
    } catch (error) {
      message.error("Thêm bảo vệ không thành công");
    }
    form.resetFields();
    setIsModalOpen(false);
    console.log(values);
  };
  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        style={{ display: "flex", alignItems: "center" }}
      >
        Thêm bảo vệ
      </Button>
      <Modal
        title="Điền thông tin bảo vệ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="addGateKeeper" form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Giới tính">
            <Select>
              <Select.Option value={true}>Nam</Select.Option>
              <Select.Option value={false}>Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
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
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Hãy điền căn cước!",
              },
            ]}
            name="idCard"
            label="CCCD"
          >
            <Input />
          </Form.Item>
          <Form.Item name="acceptedStatus" label="Trạng thái phê duyệt">
            <Select>
              <Select.Option value={true}>Phê duyệt</Select.Option>
              <Select.Option value={false}>Không phê duyệt</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ngày sinh" name="date">
            <DatePicker
              className="birthday"
              style={{ display: "flex", justifyContent: "center" }}
            />
          </Form.Item>
          <Form.Item
            label="Tên cổng"
            rules={[
              {
                required: true,
                message: "Hãy điền tên cổng!",
              },
            ]}
          >
            <AutoComplete
              options={options}
              placeholder="Tên cổng"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={handleSelectGate}
            />
          </Form.Item>
          <Form.Item
            label="Vai trò"
            rules={[
              {
                required: true,
                message: "Hãy điền vai trò!",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Hãy chọn vai trò"
              onChange={handleChange}
              options={roleOptions}
            />
          </Form.Item>
          <Form.Item
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button type="primary" htmlType="submit">
              Thêm bảo vệ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
