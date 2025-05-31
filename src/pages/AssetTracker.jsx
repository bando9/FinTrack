import AssetChart from "../components/AssetChart";
import AssetTable from "../components/AssetTable";
import { rows } from "../data/rows";
import { useForm } from "react-hook-form";
import { cash, investType, platformInvest } from "../utils/DependentDropdown";
// import { useState } from "react";
import { useNotifications } from "@toolpad/core";
import { useState } from "react";

export default function AssetTracker() {
  const notifications = useNotifications();
  const { februari, maret, mei } = rows.find((row) => row.name === "Total");

  const chartData = [5957224, februari, maret, mei];
  const chartLabels = ["Januari", "Februari", "Maret", "Mei"];

  // const [assetType, setAssetType] = useState("");
  const { register, handleSubmit, watch } = useForm();
  const assetType = watch("assetType");
  const [assetData, setAssetData] = useState([]);

  const onSubmit = (data, e) => {
    console.log("Submitted: ", data);
    const newInputAsset = {
      id: Date.now(),
      assetType: data.assetType,
      cashName: data.cashName,
      investType: data.investType,
      jumlah: Number(data.jumlah),
      platform: data.platform,
    };

    setAssetData((prev) => [...prev, newInputAsset]);
    e.target.reset();
  };

  return (
    <div className="m-10">
      <h1 className="mb-3 text-xl font-semibold">Asset Tracker</h1>

      <div className="w-1/2">
        <h2>Total Asset</h2>
        <AssetChart data={chartData} labels={chartLabels} />
      </div>

      <AssetTable rows={rows} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 w-1/2 mx-auto bg-[#254D70] p-4 flex flex-col gap-4 rounded-2xl "
      >
        <label className="bg-[#EFE4D2] p-2 rounded-md">
          Jenis Aset:{" "}
          <select {...register("assetType")} className="px-2">
            <option>--Pilih Jenis Aset--</option>
            <option value="cash">Cash</option>
            <option value="invest">Invest</option>
          </select>
        </label>

        {assetType == "cash" && (
          <label className="bg-[#EFE4D2] p-2 rounded-md">
            Jenis Dompet:{" "}
            <select {...register("cashName")} className="px-2 w-fit">
              <option>Pilih Cash</option>
              {cash.map((item) => {
                return (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
        )}

        {assetType == "invest" && (
          <>
            <label className="bg-[#EFE4D2] p-2 rounded-md">
              Platform:{" "}
              <select {...register("platform")} className="px-2 w-fit">
                <option>Pilih Platform Investasi</option>
                {platformInvest.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>

            <label className="bg-[#EFE4D2] p-2 rounded-md">
              Jenis Investasi:{" "}
              <select {...register("investType")} className="px-2 w-fit">
                <option>Pilih Jenis Investasi</option>
                {investType.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </>
        )}

        <label className="bg-[#EFE4D2] p-2 rounded-md">
          Jumlah:{" "}
          <input
            {...register("jumlah")}
            type="number"
            className="focus:outline-offset-0 focus:outline-none"
          />
        </label>

        <button
          className="px-3 py-1 bg-amber-100 rounded-lg w-1/2 mx-auto mt-2 cursor-pointer"
          onClick={() => {
            console.log(notifications);
            notifications.show("Transaksi berhasil ditambahkan!", {
              severity: "success",
              autoHideDuration: 3000,
            });
          }}
        >
          Simpan
        </button>
      </form>

      <h2 className="text-2xl">Data</h2>
      <ul className="grid grid-cols-4">
        {assetData.map((item, index) => {
          return (
            <div key={index} className="my-5">
              <li>{item.assetType}</li>
              <li>{item.cashName}</li>
              <li>{item.investType}</li>
              <li>{item.jumlah}</li>
              <li>{item.platform}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
