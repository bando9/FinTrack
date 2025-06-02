import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNotifications } from "@toolpad/core/useNotifications";
import DeleteIcon from "@mui/icons-material/Delete";

import CurrentDisplay from "../components/ui/CurrentDisplay";

import { income, expense } from "../utils/DependentDropdown";

export default function Transaction() {
  const notifications = useNotifications();

  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);
  const [total, setTotal] = useState(0);

  const { register, handleSubmit, watch, setValue } = useForm();
  const transaction = watch("transaction");

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
      transaction: data.transaction,
      category: data.category,
      account: data.account,
      note: data.note,
      jumlah: Number(data.jumlah),
    };

    setHistory((prev) => [...prev, newTransaction]);

    const amount = Number(data.jumlah);
    if (data.transaction == "Income") {
      setSumIncome((prev) => prev + amount);
      setTotal((prev) => prev + amount);
    } else {
      setSumExpense((prev) => prev + amount);
      setTotal((prev) => prev - amount);
    }
    e.target.reset();
  };

  const deleteTransaction = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setValue("category", "default");
  }, [transaction, setValue]);

  // useEffect(() => {
  //   if (transaction === "cash") {
  //     resetField("platform");
  //     resetField("investType");
  //   } else if (assetType === "invest") {
  //     resetField("cashName");
  //   }
  // }, [assetType, resetField]);

  return (
    <div className="w-3/4 m-auto bg-amber-300 rounded-2xl pb-10 mt-10">
      <div className="container m-auto mt-10 p-2 w-3/4">
        <h1 className="text-4xl underline mb-4 text-center">Transaction</h1>
        <form
          className="flex flex-col gap-1.5"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="bg-amber-200 p-2 rounded-md w-fit">
            <select
              {...register("transaction")}
              className="px-2 w-fit"
              defaultValue="expense"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </label>

          {transaction == "Income" && (
            <label className="bg-amber-200 p-2 rounded-md">
              Kategori:{" "}
              <select
                {...register("category")}
                className="px-2 w-fit"
                defaultValue="default"
              >
                <option value="default" disabled hidden>
                  Pilih Kategori
                </option>
                {income.map((item) => {
                  return (
                    <option value={item.name} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
          )}
          {transaction == "Expense" && (
            <label className="bg-amber-200 p-2 rounded-md">
              Kategori:{" "}
              <select
                {...register("category")}
                className="px-2 w-fit"
                defaultValue="default"
              >
                <option value="default" disabled hidden>
                  Pilih Kategori
                </option>
                {expense.map((item) => {
                  return (
                    <option value={item.name} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
          )}

          <label className="bg-amber-200 p-2 rounded-md">
            Rekening:{" "}
            <select
              {...register("account")}
              className="px-2"
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                Pilih Rekening
              </option>
              <option value="CIMB Niaga">CIMB Niaga</option>
              <option value="BRI">BRI</option>
              <option value="Jago">Jago</option>
              <option value="Gopay">Gopay</option>
            </select>
          </label>

          <label className="bg-amber-200 p-2 rounded-md flex gap-2">
            Catatan: <textarea {...register("note")} className="w-full" />
          </label>

          <label className="bg-amber-200 p-2 rounded-md">
            Jumlah:{" "}
            <input
              {...register("jumlah")}
              type="number"
              className="focus:outline-offset-0 focus:outline-none"
              placeholder="0"
            />
          </label>

          <button
            className="px-3 py-1 bg-amber-100 rounded-lg w-1/2 mx-auto mt-2 cursor-pointer"
            onClick={() => {
              notifications.show("Transaksi berhasil ditambahkan!", {
                severity: "success",
                autoHideDuration: 3000,
              });
            }}
          >
            Simpan
          </button>
        </form>

        <div className="my-5 bg-amber-200 p-3">
          <p>
            Pemasukan:{" "}
            <span className="text-green-700">
              <CurrentDisplay amount={sumIncome} />
            </span>
          </p>
          <p>
            Pengeluaran:{" "}
            <span className="text-red-700">
              <CurrentDisplay amount={sumExpense} />
            </span>
          </p>
          <p>
            Total: <CurrentDisplay amount={total} />
          </p>
        </div>

        <h3 className="text-2xl mt-7 mb-3">Riwayat</h3>
        <div className="grid grid-cols-3 gap-4">
          {history.length > 0 ? (
            history.map((item) => {
              return (
                <div key={item.id} className="mt-2 bg-amber-200 p-2 rounded-sm">
                  <div className="flex gap-1">
                    <p className={getBadgeTransaction(item.transaction)}>
                      {item.transaction}
                    </p>
                    <p className={getBadgeClass(item.category)}>
                      {item.category}
                    </p>
                  </div>
                  <p>Rekening: {item.account}</p>
                  <p>Catatan: {item.note ? `${item.note}` : "-"}</p>
                  <p>
                    Jumlah: <CurrentDisplay amount={item.jumlah} />
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

function getBadgeTransaction(transaction) {
  switch (transaction) {
    case "Income":
      return "badge-green";
    case "Expense":
      return "badge-red";
  }
}
