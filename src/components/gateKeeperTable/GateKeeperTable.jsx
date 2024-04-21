import { useContext, useEffect, useState } from "react";
import { userRequest } from "../../utils/requestMethod";
import { Button, Popconfirm, Table, Tag, message } from "antd";
import { UpdateGateKeeperModal } from "../updateGateKeeperModal/UpdateGatekeeperModal";
import { DeleteOutlined } from "@ant-design/icons";
import { getCurrentDate1 } from "../../utils/Format";
import { UpdateGateContext } from "../../pages/gateKeeper/GateKeeper";

export const GateKeeperTable = ({ totalCount, setTotalCount }) => {
  const { update, setUpdate } = useContext(UpdateGateContext);
  const [gateKeepers, setGateKeepers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const confirm = async (record) => {
    try {
      const res = await userRequest.put(`/users/${record.id}`, {
        ...record,
        roleIds: record.roles.map((role) => role.id),
        deletedAt: getCurrentDate1(),
      });
      message.success("Xóa bảo vệ thành công");
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      message.error("Xóa bảo vệ thất bại");
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const getGateKeepers = async (currentPage) => {
    try {
      setIsLoading(true);
      const res = await userRequest.get(
        `/gateKeepers?pageNumber=${currentPage}&pageSize=${pageSize}`
      );
      setGateKeepers(res.data.content);
      setTotalCount(res.data.totalElements);
      setPage(currentPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGateKeepers(1);
  }, []);
  useEffect(() => {
    getGateKeepers(page);
  }, [update]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => <span>{email}</span>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      render: (phone) => <span>{phone}</span>,
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      render: (username) => <span>{username}</span>,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      render: (gender) => <span>{gender ? "Nam" : "Nữ"}</span>,
    },
    {
      title: "Tên cổng",
      dataIndex: "gate",
      render: (gate) => <span>{gate.name}</span>,
    },
    {
      title: "Trạng thái phê duyệt",
      dataIndex: "acceptedStatus",
      align: "center",
      render: (acceptedStatus) => {
        let tagColor;
        switch (acceptedStatus) {
          case false:
            tagColor = "volcano";
            break;
          case true:
            tagColor = "green";
            break;
        }

        return (
          <Tag color={tagColor}>
            {acceptedStatus === true ? "Đã phê duyệt" : "Chưa phê duyệt"}
          </Tag>
        );
      },
    },
    {
      title: "Cập nhật thông tin",
      align: "center",
      render: (_, record) => {
        const handleDeleteConfirm = () => {
          confirm(record);
        };
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <UpdateGateKeeperModal gatekeeper={record} />
            <Popconfirm
              title="Xóa bảo vệ"
              description="Bạn có chắc muốn xóa người này không?"
              onConfirm={handleDeleteConfirm}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <Table
      style={{ marginBlockStart: "1em" }}
      columns={columns}
      dataSource={gateKeepers}
      rowKey="id"
      loading={isLoading}
      pagination={{
        pageSize: pageSize,
        current: page,
        total: totalCount,
        onChange: (page) => {
          getGateKeepers(page);
        },
      }}
    />
  );
};
