import { useContext, useState } from "react";
import { userRequest } from "../../utils/requestMethod";
import { Button, Form, Input, message, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UpdateGateContext } from "../../pages/gateKeeper/GateKeeper";

export const UpdateGateModal = ({ gate }) => {
  const { update, setUpdate } = useContext(UpdateGateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: gate.name,
    address: gate.address,
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
      const res = await userRequest.put(`/gates/${gate.id}`, {
        ...values,
      });
      message.success("Cập nhật cổng thành công");
      setFormData(values);
      setIsModalOpen(false);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      message.error("Cập nhật cổng thất bại");
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
          <Form.Item
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button type="primary" htmlType="submit">
              Cập nhật cổng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
