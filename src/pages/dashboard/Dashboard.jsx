import "./Dashboard.scss";
import logo from "../../image/logo-Vinhomes.png";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Topbar } from "../../components/topbar/Topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserCheck,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { PieChart } from "../../components/pieChart/PieChart";
import { StackedBarChart } from "../../components/stackedBarChart/StackedBarChart";
import React, { useEffect, useState } from "react";
import { DatePicker, message } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { userRequest } from "../../utils/requestMethod";

export const Dashboard = () => {
  dayjs.extend(customParseFormat);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [statistic, setStatistic] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const getStatistic = async () => {
    try {
      const month = dayjs().month() + 1;
      const year = dayjs().year();
      const res = await userRequest.get(
        `/statistic/overview?month=${month}&year=${year}`
      );
      setStatistic(res.data);
    } catch (error) {
      console.log(error);
      message.error("Lấy thống kê Overview không thành công");
    }
  };
  useEffect(() => {
    getStatistic();
  }, []);
  const monthFormat = "YYYY/MM";
  return (
    <div className="webInterfaceContainer">
      <img className="logoWeb" src={logo} alt="logo" width={150} height={150} />
      <Topbar />
      <Sidebar />
      <div className="contentWebContainer">
        <div className="contentWeb">
          <div className="dashboardTitle">
            <h4>Tổng quan</h4>
          </div>
          <div className="overViewContainer">
            <div
              className="overViewContent"
              style={{ backgroundColor: "var(--color-max-light-purple)" }}
            >
              <span>Tổng số dân cư</span>
              <h3>{statistic?.totalResidents}</h3>
              <div
                className="iconContainer"
                style={{ backgroundColor: "var(--color-purple)" }}
              >
                <FontAwesomeIcon icon={faUser} color="var(--color-light)" />
              </div>
            </div>
            <div
              className="overViewContent"
              style={{ backgroundColor: "var(--color-max-light-blue)" }}
            >
              <span>Tổng số bảo vệ</span>
              <h3>{statistic?.totalGateKeepers}</h3>
              <div
                className="iconContainer"
                style={{ backgroundColor: "var(--color-blue)" }}
              >
                <FontAwesomeIcon
                  icon={faUserShield}
                  color="var(--color-light)"
                />
              </div>
            </div>
            <div
              className="overViewContent"
              style={{ backgroundColor: "var(--color-max-light-red)" }}
            >
              <span>Tổng khách đến trong tháng</span>
              <h3>{statistic?.visitorPerMonth}</h3>
              <div
                className="iconContainer"
                style={{ backgroundColor: "var(--color-red)" }}
              >
                <FontAwesomeIcon
                  icon={faUserCheck}
                  color="var(--color-light)"
                />
              </div>
            </div>
          </div>
          <div className="dashboardTitle" style={{ marginBlockStart: "1em" }}>
            <h4>Biểu đồ</h4>
          </div>
          <div className="chartContainer">
            <div className="pieChartContainer">
              <h5>Dân cư</h5>
              <PieChart />
            </div>
            <div className="barChartContainer">
              <DatePicker
                defaultValue={selectedDate}
                format={monthFormat}
                picker="month"
                onChange={handleDateChange}
              />
              <StackedBarChart
                month={selectedDate?.month() + 1}
                year={selectedDate?.year()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
