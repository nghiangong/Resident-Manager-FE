import { useEffect, useState } from "react";
import { userRequest } from "../../utils/requestMethod";
import { message } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const StackedBarChart = ({ month, year }) => {
  const [statistic, setStatistic] = useState(null);
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Lịch sử vào ra",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const getStatistic = async () => {
    try {
      if (month != null && year != null) {
        const res = await userRequest.get(
          `/statistic/month?month=${month}&year=${year}`
        );
        setStatistic(res.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Lấy thống kê StackedBarChart không thành công");
    }
  };
  useEffect(() => {
    getStatistic();
  }, [month, year]);
  const labels = statistic?.map((eachday) => eachday.day) || [];
  const data = {
    labels,
    datasets: [
      {
        label: "Dân cư",
        data: statistic?.map((eachday) => eachday.totalResidents) || [],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Khách",
        data: statistic?.map((eachday) => eachday.totalVisitors) || [],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
