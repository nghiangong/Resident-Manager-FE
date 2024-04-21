import { message } from "antd";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { userRequest } from "../../utils/requestMethod";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
export const PieChart = () => {
  const [statistic, setStatistic] = useState(null);
  const getStatistic = async () => {
    try {
      const res = await userRequest.get("/statistic/pieChart");
      setStatistic(res.data);
    } catch (error) {
      console.log(error);
      message.error("Lấy thống kê PieChart không thành công");
    }
  };
  useEffect(() => {
    getStatistic();
  }, []);
  const data = {
    labels: ["Đang sinh sống", "Đã rời đi", "Chờ phê duyệt"],
    datasets: [
      {
        label: "Số người",
        data: [statistic?.living, statistic?.leaved, statistic?.unApproved],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};
