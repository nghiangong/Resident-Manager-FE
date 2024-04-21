import { useContext, useState } from "react";
import { userRequest } from "../../utils/requestMethod";
import { Input, Modal, message, Form, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UpdateHouseContext } from "../../pages/house/House";

export const UpdateHouseModal = ({ house }) => {
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { update, setUpdate } = useContext(UpdateHouseContext);
  const [formData, setFormData] = useState({
    ...house,
  });
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
      const res = await userRequest.put(`/houses/${house.id}`, {
        ...values,
      });
      message.success("Cập nhật nhà thành công");
      setFormData(values);
      setIsModalOpen(false);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      message.error("Cập nhật nhà thất bại");
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
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button type="primary" htmlType="submit">
              Cập nhật nhà
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
