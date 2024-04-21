import { useContext, useEffect, useState } from "react";
import { userRequest } from "../../utils/requestMethod";
import {
  Form,
  Modal,
  message,
  Select,
  Button,
  Input,
  AutoComplete,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UpdateGateContext } from "../../pages/gateKeeper/GateKeeper";

export const UpdateGateKeeperModal = ({ gatekeeper }) => {
  const { update, setUpdate } = useContext(UpdateGateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGateId, setSelectedGateId] = useState(gatekeeper.gate.id);
  const [roleOptions, setRoleOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [gate, setGate] = useState([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState(
    gatekeeper.roles.map((role) => role.id)
  );
  const [formData, setFormData] = useState({
    name: gatekeeper.name,
    gender: gatekeeper.gender,
    phone: gatekeeper.phone,
    username: gatekeeper.username,
    email: gatekeeper.email,
    acceptedStatus: gatekeeper.acceptedStatus,
    idCard: gatekeeper.idCard,
  });
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
  const handleChange = (values) => {
    console.log(`selected role ${values}`);
    setSelectedRoleIds(values);
  };
  useEffect(() => {
    getGates();
    getRoles();
  }, []);
  useEffect(() => {
    // Biến đổi dữ liệu từ mảng houses để tạo options
    const oldRoles = gatekeeper.roles.map((role) => ({
      label: role.name,
      value: role.id,
    }));
    setRoles(oldRoles);
  }, [gatekeeper.roles]);
  useEffect(() => {
    // Biến đổi dữ liệu từ mảng houses để tạo options
    const oldGate = {
      value: `${gatekeeper.gate.name} - Địa chỉ ${gatekeeper.gate.address}`,
      id: gatekeeper.gate.id,
    };
    setGate(oldGate);
  }, [gatekeeper.gate]);
  const handleSelectGate = (value, option) => {
    console.log(`selected gateId ${option.id}`);
    setSelectedGateId(option.id); // Lưu ID của nhà được chọn khi người dùng chọn từ danh sách
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    try {
      const res = await userRequest.put(`/users/${gatekeeper.id}`, {
        ...values,
        gateId: selectedGateId,
        roleIds: selectedRoleIds,
        image: gatekeeper.image,
        date: gatekeeper.date,
      });
      message.success("Cập nhật bảo vệ thành công");
      setFormData(values);
      setIsModalOpen(false);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      message.error("Cập nhật bảo vệ thất bại");
    }
  };
  return (
    <>
      <EditOutlined type="primary" onClick={showModal} />
      <Modal
        title="Cập nhật thông tin"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="nest-messages" onFinish={onFinish} initialValues={formData}>
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
          <Form.Item name="idCard" label="CCCD">
            <Input />
          </Form.Item>
          <Form.Item name="acceptedStatus" label="Trạng thái phê duyệt">
            <Select>
              <Select.Option value={true}>Phê duyệt</Select.Option>
              <Select.Option value={false}>Không phê duyệt</Select.Option>
            </Select>
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
              defaultValue={gate}
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
              defaultValue={roles}
              onChange={handleChange}
              options={roleOptions}
            />
          </Form.Item>
          <Form.Item
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button type="primary" htmlType="submit">
              Cập nhật bảo vệ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
