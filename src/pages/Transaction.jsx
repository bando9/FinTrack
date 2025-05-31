import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNotifications } from "@toolpad/core/useNotifications";
import DeleteIcon from "@mui/icons-material/Delete";

import CurrentDisplay from "../components/ui/CurrentDisplay";

export default function Transaction() {
  const notifications = useNotifications();

  const { register, handleSubmit } = useForm();

  const [history, setHistory] = useState(() => {
    // Load data if it exist
    const savedData = localStorage.getItem("transactionHistory");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactionHistory", JSON.stringify(history));
  }, [history]);

  const onSubmit = (data, e) => {
    const newTransaction = {
      id: Date.now(),
      category: data.category,
      rekening: data.rekening,
      jumlah: Number(data.jumlah),
    };

    setHistory((prev) => [...prev, newTransaction]);

    e.target.reset();
  };

  const deleteTransaction = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-3/4 m-auto bg-amber-300 rounded-2xl pb-10 mt-10">
      <div className="container m-auto mt-10 p-2 w-3/4">
        <h1 className="text-4xl underline mb-4 text-center">Transaction</h1>
        <form
          className="flex flex-col gap-1.5"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="bg-amber-200 p-2 rounded-md">
            Kategori:{" "}
            <select {...register("category")} className="px-2 w-fit">
              <option>Pilih Kategori</option>
              <option value="Gaji">Gaji</option>
              <option value="Bonus">Bonus</option>
              <option value="THR">THR</option>
            </select>
          </label>

          <label className="bg-amber-200 p-2 rounded-md">
            Rekening:{" "}
            <select {...register("rekening")} className="px-2">
              <option>Pilih Rekening</option>
              <option value="CIMB Niaga">CIMB Niaga</option>
              <option value="BRI">BRI</option>
              <option value="Jago">Jago</option>
              <option value="Gopay">Gopay</option>
            </select>
          </label>

          <label className="bg-amber-200 p-2 rounded-md">
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

        <h3 className="text-2xl mt-7 mb-3">Riwayat</h3>
        <div className="grid grid-cols-3 gap-4">
          {history.length > 0 ? (
            history.map((item) => {
              return (
                <div key={item.id} className="mt-2 bg-amber-200 p-2 rounded-sm">
                  <p className={getBadgeClass(item.category)}>
                    {item.category}
                  </p>
                  <p>Rekening: {item.rekening}</p>
                  <p>
                    Jumlah: <CurrentDisplay amount={item.jumlah} />{" "}
                  </p>
                  <DeleteIcon
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteTransaction(item.id)}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">Belum ada riwayat</p>
          )}
        </div>
      </div>
    </div>
  );
}

function getBadgeClass(category) {
  switch (category) {
    case "Gaji":
      return "badge-green";
    case "Bonus":
      return "badge-blue";
    case "THR":
      return "badge-yellow";
    default:
      return "badge-gray";
  }
}
