import AssetChart from "../components/AssetChart";
import { rows } from "../data/rows";
import AssetTable from "../components/AssetTable";

export default function AssetTracker() {
  const { februari, maret, mei } = rows.find((row) => row.name === "Total");

  const chartData = [5957224, februari, maret, mei];
  const chartLabels = ["Januari", "Februari", "Maret", "Mei"];

  return (
    <div className="m-10">
      <h1 className="mb-3 text-xl font-semibold">Asset Tracker</h1>

      <div className="w-3/4">
        <h2>Total Asset</h2>
        <AssetChart data={chartData} labels={chartLabels} />
      </div>

      <AssetTable />
    </div>
  );
}
