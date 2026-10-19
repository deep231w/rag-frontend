import { Box } from "@mui/material";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const data = {
    labels: ["PDFs", "Images", "Docs"],
    datasets: [
      {
        data: [40, 20, 10],
        backgroundColor: ["#E4B72C", "#6E8FCF", "#3C8D6F"],
        borderColor: "#101318",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "58%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#9AA4B2",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 16,
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: "#1B2028",
        titleColor: "#E8ECF2",
        bodyColor: "#E8ECF2",
        borderColor: "#303744",
        borderWidth: 1,
      },
    },
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Doughnut data={data} options={options} />
    </Box>
  );
}