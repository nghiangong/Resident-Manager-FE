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
  const onSearch = (value, _e, info) => console.log(info?.source, value);
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
          <HistoryTable totalCount={totalCount} setTotalCount={setTotalCount} />
        </div>
      </div>
    </div>
  );
};
