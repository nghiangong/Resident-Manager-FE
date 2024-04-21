import { EditOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../utils/requestMethod";
import {
  Modal,
  message,
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
} from "antd";
import { UpdateResidentContext } from "../../pages/resident/Resident";

export const UpdateResidentModal = ({ resident }) => {
  const { update, setUpdate } = useContext(UpdateResidentContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHouseId, setSelectedHouseId] = useState(resident.house.id);
  const [options, setOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [house, setHouse] = useState([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState(
    resident.roles.map((role) => role.id)
  );
  const [formData, setFormData] = useState({
    name: resident.name,
    gender: resident.gender,
    phone: resident.phone,
    username: resident.username,
    email: resident.email,
    acceptedStatus: resident.acceptedStatus,
    idCard: resident.idCard,
  });
  const getHouses = async () => {
    try {
      const res = await publicRequest.get("/houses");
      const newOptions = res.data.map((house) => ({
        value: `${house.name} - Địa chỉ ${house.address}`,
        id: house.id,
      }));
      setOptions(newOptions);
    } catch (error) {
      message.error("Lấy thông tin tòa nhà thất bại");
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
    getHouses();
    getRoles();
  }, []);
  useEffect(() => {
    // Biến đổi dữ liệu từ mảng houses để tạo options
    const oldRoles = resident.roles.map((role) => ({
      label: role.name,
      value: role.id,
    }));
    setRoles(oldRoles);
  }, [resident.roles]);
  useEffect(() => {
    // Biến đổi dữ liệu từ mảng houses để tạo options
    const oldHouse = {
      value: `${resident.house.name} - Địa chỉ ${resident.house.address}`,
      id: resident.house.id,
    };
    setHouse(oldHouse);
  }, [resident.house]);
  const handleSelectHouse = (value, option) => {
    console.log(`selected houseId ${option.id}`);
    setSelectedHouseId(option.id); // Lưu ID của nhà được chọn khi người dùng chọn từ danh sách
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
      const res = await userRequest.put(`/users/${resident.id}`, {
        name: values.name,
        gender: values.gender,
        phone: values.phone,
        username: values.username,
        email: values.email,
        acceptedStatus: values.acceptedStatus,
        idCard: values.idCard,
        houseId: selectedHouseId,
        roleIds: selectedRoleIds,
        image: resident.image,
        date: resident.date,
        ownId: resident.ownId,
        createQrPermission: resident.createQrPermission,
      });
      message.success("Cập nhật cư dân thành công");
      setFormData(values);
      setIsModalOpen(false);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      message.error("Cập nhật cư dân thất bại");
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
            label="Tên nhà"
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
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              defaultValue={house}
              onSelect={handleSelectHouse}
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
              Cập nhật cư dân
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
