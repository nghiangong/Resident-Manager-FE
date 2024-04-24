import { Button, Popconfirm, Table, message } from "antd";
import { userRequest } from "../../utils/requestMethod";
import { useContext, useEffect, useState } from "react";
import { UpdateGateModal } from "../updateGateModal/UpdateGateModal";
import { DeleteOutlined } from "@ant-design/icons";
import { getCurrentDate1 } from "../../utils/Format";
import { UpdateGateContext } from "../../pages/gateKeeper/GateKeeper";

export const GateTable = ({ totalCount, setTotalCount, keyword }) => {
  const { update, setUpdate } = useContext(UpdateGateContext);
  const [gates, setGates] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const confirm = async (record) => {
    try {
      const res = await userRequest.put(`/gates/${record.id}`, {
        ...record,
        deletedAt: getCurrentDate1(),
      });
      message.success("Xóa cổng thành công");
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
  const getGates = async (currentPage) => {
    try {
      setIsLoading(true);
      let url = `/gates/page?pageNumber=${currentPage}&pageSize=${pageSize}`;
      // Thêm keyword vào url nếu tồn tại
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      const res = await userRequest.get(url);
      setGates(res.data.content);
      setTotalCount(res.data.totalElements);
      setPage(currentPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGates(1);
  }, [keyword]);
  useEffect(() => {
    getGates(page);
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
            <UpdateGateModal gate={record} />
            <Popconfirm
              title="Xóa cổng"
              description="Bạn có chắc muốn xóa cổng này không?"
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
      dataSource={gates}
      rowKey="id"
      loading={isLoading}
      pagination={{
        pageSize: pageSize,
        current: page,
        total: totalCount,
        onChange: (page) => {
          getGates(page);
        },
      }}
    />
  );
};
