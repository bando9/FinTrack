import AssetTable from "../components/AssetTable";

export default function AssetTracker() {
  return (
    <div className="m-10">
      <h1 className="mb-3 text-xl font-semibold">Asset Tracker</h1>

      <div className="w-3/4">
        <h2>Total Asset</h2>
      </div>

      <AssetTable />
    </div>
  );
}
