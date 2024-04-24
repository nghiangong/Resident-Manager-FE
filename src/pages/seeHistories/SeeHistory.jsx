import { Button } from "antd";
import logo from "../../image/logo-Vinhomes.png";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Topbar } from "../../components/topbar/Topbar";
import "./SeeHistory.scss";
import React, { useState } from "react";
import { DatePicker } from "antd";
import { Input, Space } from "antd";
import { HistoryTable } from "../../components/historyTable/HistoryTable";
import moment from "moment";

export const SeeHistory = () => {
  const { Search } = Input;
  const { RangePicker } = DatePicker;
  const [totalCount, setTotalCount] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState(null); // Thêm state cho startDate
  const [endDate, setEndDate] = useState(null);
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    setKeyword(value); // Cập nhật keyword khi click tìm kiếm
  };
  const handleRangePickerChange = (dates) => {
    if (dates) {
      console.log(dates);
      setStartDate(dates[0].format("YYYY-MM-DD")); // Lưu ngày bắt đầu
      setEndDate(dates[1].format("YYYY-MM-DD"));
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };
  return (
    <div className="webInterfaceContainer">
      <img className="logoWeb" src={logo} alt="logo" width={150} height={150} />
      <Topbar />
      <Sidebar />
      <div className="contentWebContainer">
        <div className="contentWeb">
          <div className="seeHistoryTitle">
            <h4>Lịch sử vào ra</h4>
            <div className="searchContainer">
              <RangePicker
                disabledDate={(current) => {
                  return moment().add(0, "days") <= current;
                }}
                onChange={handleRangePickerChange}
              />
              <Search
                placeholder="Search"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
              <span>
                Total rows:{" "}
                <span style={{ color: "var(--color-blue)" }}>{totalCount}</span>
              </span>
            </div>
          </div>
          <HistoryTable
            totalCount={totalCount}
            setTotalCount={setTotalCount}
            keyword={keyword}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </div>
  );
};
