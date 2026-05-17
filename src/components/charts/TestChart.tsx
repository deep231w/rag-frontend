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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function DashboardChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Bots Created",
        data: [12, 19, 8, 15, 22],

        borderColor: "#facc15",
        backgroundColor: "rgba(250,204,21,0.2)",

        tension: 0.4,
      },
    ],
  };

  return (
    <Line data={data} />
  );
}