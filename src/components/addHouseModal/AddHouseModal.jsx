import { Button, Form, Modal, message, Input } from "antd";
import { useContext, useState } from "react";
import { userRequest } from "../../utils/requestMethod";
import { UpdateHouseContext } from "../../pages/house/House";

export const AddHouseModal = () => {
  const { update, setUpdate } = useContext(UpdateHouseContext);
  const { TextArea } = Input;
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
      const res = await userRequest.post("/house", {
        ...values,
      });
      message.success("Thêm nhà thành công");
      setUpdate(!update);
    } catch (error) {
      message.error("Thêm nhà không thành công");
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
        Thêm nhà
      </Button>
      <Modal
        title="Điền thông tin nhà"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="addHouse" form={form} onFinish={onFinish}>
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
              Thêm nhà
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
