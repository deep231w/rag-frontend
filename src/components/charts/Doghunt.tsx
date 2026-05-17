import { Box } from "@mui/material";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function DoughnutChart() {
  return (
    <Box>
      <Doughnut
        data={{
          labels: ["PDFs", "Images", "Docs"],
          datasets: [
            {
              data: [40, 20, 10],
              backgroundColor: [
                "#facc15",
                "#38bdf8",
                "#22c55e",
              ],
            },
          ],
        }}
      />
    </Box>
  );
}