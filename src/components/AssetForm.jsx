import { useNotifications } from "@toolpad/core";
import { useForm } from "react-hook-form";
import { months } from "../constants/months";

export default function AssetTableForm({ onSubmit }) {
  const notifications = useNotifications();

  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    notifications.show("Transaksi berhasil ditambahkan!", {
      severity: "success",
      autoHideDuration: 3000,
    });
    reset();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col w-1/3 bg-green-300 p-5 rounded-xl gap-1"
      >
        <label className="w-fit">
          Asset:{" "}
          <select
            {...register("assetInput")}
            defaultValue="default"
            className="px-2"
          >
            <option value="default" hidden>
              choose asset
            </option>
            <option value="Bibit">Bibit</option>
            <option value="Ipot">Ipot</option>
            <option value="BRI">BRI</option>
            <option value="BSI">BSI</option>
            <option value="Jago">Bank Jago</option>
            <option value="Gopay">Go-pay</option>
          </select>
        </label>

        <label className="w-fit">
          Bulan:{" "}
          <select
            {...register("monthInput")}
            defaultValue={"default"}
            className="px-2"
          >
            <option value="default" hidden>
              choose month
            </option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label>
          Jumlah:{" "}
          <input
            type="number"
            {...register("totalInput")}
            className="border-1 border-green-500 text-amber-50 rounded-sm bg-green-500"
          />
        </label>

        <button
          onClick={() => {
            notifications.show("Transaksi berhasil ditambahkan!", {
              severity: "success",
              autoHideDuration: 3000,
            });
          }}
          className="bg-amber-200 p-1 rounded-md mt-2"
        >
          Kirim
        </button>
      </form>
    </>
  );
}
