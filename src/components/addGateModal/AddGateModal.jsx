import { Button, Form, Input, Modal, message } from "antd";
import { useContext, useState } from "react";
import { userRequest } from "../../utils/requestMethod";
import { UpdateGateContext } from "../../pages/gateKeeper/GateKeeper";

export const AddGateModal = () => {
  const { update, setUpdate } = useContext(UpdateGateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinish = async (values) => {
    try {
      const res = await userRequest.post("/gate", {
        ...values,
      });
      message.success("Thêm cổng thành công");
      setUpdate(!update);
      form.resetFields();
    } catch (error) {
      message.error("Thêm cổng không thành công");
    }
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
        Thêm cổng
      </Button>
      <Modal
        title="Điền thông tin cổng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name="addGate" onFinish={onFinish}>
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
              Thêm cổng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
