import { Table, Tag, Popconfirm, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../utils/requestMethod";
import { UpdateResidentModal } from "../updateResidentModal/UpdateResidentModal";
import { DeleteOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { getCurrentDate1 } from "../../utils/Format";
import { UpdateResidentContext } from "../../pages/resident/Resident";

export const ResidentTable = ({
  acceptedStatus,
  totalCount,
  setTotalCount,
}) => {
  const { update, setUpdate } = useContext(UpdateResidentContext);
  const [residents, setResidents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const confirm = async (record) => {
    try {
      const res = await userRequest.put(`/users/${record.id}`, {
        ...record,
        roleIds: record.roles.map((role) => role.id),
        deletedAt: getCurrentDate1(),
      });
      message.success("Xóa cư dân thành công");
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      message.error("Xóa cư dân thất bại");
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const getResidents = async (currentPage) => {
    try {
      setIsLoading(true);
      const res = await userRequest.get(
        `/users/page?pageNumber=${currentPage}&pageSize=${pageSize}&acceptedStatus=${acceptedStatus}`
      );
      setResidents(res.data.content);
      setTotalCount(res.data.totalElements);
      setPage(currentPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResidents(1);
  }, []);
  useEffect(() => {
    // Khi updateFlag thay đổi, cập nhật lại dữ liệu cư dân từ server
    getResidents(page);
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
      title: "Tên nhà",
      dataIndex: "house",
      render: (house) => <span>{house.name}</span>,
    },
    {
      title: "Vai trò",
      dataIndex: "ownId",
      align: "center",
      render: (ownId) => {
        let tagColor;
        if (ownId === 0) {
          tagColor = "magenta";
        } else {
          tagColor = "lime";
        }
        return (
          <Tag color={tagColor}>{ownId === 0 ? "Chủ nhà" : "Thành viên"}</Tag>
        );
      },
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
            <UpdateResidentModal resident={record} />
            <Popconfirm
              title="Xóa cư dân"
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
      dataSource={residents}
      rowKey="id"
      loading={isLoading}
      pagination={{
        pageSize: pageSize,
        current: page,
        total: totalCount,
        onChange: (page) => {
          getResidents(page);
        },
      }}
    />
  );
};
