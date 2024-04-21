import { useContext, useState, useEffect } from "react";
import { userRequest } from "../../utils/requestMethod";
import { Button, Popconfirm, Table, message } from "antd";
import { UpdateHouseModal } from "../updateHouseModal/UpdateHouseModal";
import { DeleteOutlined } from "@ant-design/icons";
import { UpdateHouseContext } from "../../pages/house/House";
import { getCurrentDate1 } from "../../utils/Format";

export const HouseTable = ({ totalCount, setTotalCount }) => {
  const [houses, setHouses] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const { update, setUpdate } = useContext(UpdateHouseContext);
  const confirm = async (record) => {
    try {
      const res = await userRequest.put(`/houses/${record.id}`, {
        ...record,
        deletedAt: getCurrentDate1(),
      });
      message.success("Xóa nhà thành công");
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      message.error(error.response.data.apierror.message);
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const getHouses = async (currentPage) => {
    try {
      setIsLoading(true);
      const res = await userRequest.get(
        `/houses/page?pageNumber=${currentPage}&pageSize=${pageSize}`
      );
      setHouses(res.data.content);
      setTotalCount(res.data.totalElements);
      setPage(currentPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHouses(1);
  }, []);
  useEffect(() => {
    getHouses(page);
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
      title: "Địa chỉ",
      dataIndex: "address",
      render: (address) => <span>{address}</span>,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      render: (note) => <span>{note}</span>,
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
            <UpdateHouseModal house={record} />
            <Popconfirm
              title="Xóa nhà"
              description="Bạn có chắc muốn xóa nhà này không?"
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
      style={{
        marginBlockStart: "1em",
        width: "fit-content",
        alignSelf: "center",
      }}
      columns={columns}
      dataSource={houses}
      rowKey="id"
      loading={isLoading}
      pagination={{
        pageSize: pageSize,
        current: page,
        total: totalCount,
        onChange: (page) => {
          getHouses(page);
        },
      }}
    />
  );
};
