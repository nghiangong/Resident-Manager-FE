import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../utils/requestMethod";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { formatDateTimeDetail } from "../../utils/Format";

export const HistoryTable = ({
  totalCount,
  setTotalCount,
  keyword,
  startDate,
  endDate,
}) => {
  const [histories, setHistories] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const auth = useAuthUser();
  const getHistories = async (currentPage) => {
    try {
      setIsLoading(true);
      let url = `/histories/page?pageNumber=${currentPage}&pageSize=${pageSize}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
      // Kiểm tra auth.gate và xây dựng phần query string tương ứng
      if (auth.gate) {
        url += `&gateId=${auth.gate.id}`;
      }

      const res = await userRequest.get(url);

      setHistories(res.data.content);
      setTotalCount(res.data.totalElements);
      setPage(currentPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHistories(1);
  }, [keyword, startDate, endDate]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Tên người ra vào",
      dataIndex: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      render: (gender) => <span>{gender ? "Nam" : "Nữ"}</span>,
    },
    {
      title: "Thời gian",
      dataIndex: "date",
      render: (date) => <span>{formatDateTimeDetail(date)}</span>,
    },
    {
      title: "Tên cổng",
      dataIndex: "gate",
      render: (gate) => <span>{gate.name}</span>,
    },
    {
      title: "Yêu cầu",
      dataIndex: "resident",
      align: "center",
      render: (resident) => {
        let tagColor;
        switch (resident) {
          case false:
            tagColor = "volcano";
            break;
          case true:
            tagColor = "green";
            break;
        }

        return (
          <Tag color={tagColor}>{resident === true ? "Cư dân" : "Khách"}</Tag>
        );
      },
    },
    {
      title: "Tên người tạo",
      dataIndex: "qrCreator",
      render: (qrCreator) => <span>{qrCreator.name}</span>,
    },
  ];
  return (
    <Table
      style={{ marginBlockStart: "1em" }}
      columns={columns}
      dataSource={histories}
      rowKey="id"
      loading={isLoading}
      pagination={{
        pageSize: pageSize,
        current: page,
        total: totalCount,
        onChange: (page) => {
          getHistories(page);
        },
      }}
    />
  );
};
