import { BarChart } from "@mui/x-charts/BarChart";

function AssetChart({ data, labels }) {
  return (
    <BarChart series={[{ data }]} height={290} xAxis={[{ data: labels }]} />
  );
}

export default AssetChart;
