import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function DashboardChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Bots Created",
        data: [12, 19, 8, 15, 22],
        borderColor: "#E4B72C",
        backgroundColor: "rgba(228, 183, 44, 0.18)",
        pointBackgroundColor: "#E4B72C",
        pointBorderColor: "#E4B72C",
        pointRadius: 3,
        borderWidth: 2,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1B2028",
        titleColor: "#E8ECF2",
        bodyColor: "#E8ECF2",
        borderColor: "#303744",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(154, 164, 178, 0.12)",
          drawBorder: false,
        },
        ticks: { color: "#9AA4B2" },
      },
      y: {
        grid: {
          color: "rgba(154, 164, 178, 0.12)",
          drawBorder: false,
        },
        ticks: { color: "#9AA4B2" },
      },
    },
  };

  return <Line data={data} options={options} />;
}