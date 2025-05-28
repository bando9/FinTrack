import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Transaction() {
  // const today = new Date().toDateString();

  const [transactions, setTransactions] = useState([]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    const newTransaction = {
      id: Date.now(),
      category: data.category,
      rekening: data.rekening,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    e.target.reset();
  };

  return (
    <div className="w-1/2 flex m-auto bg-amber-300 rounded-2xl pb-10 mt-10">
      <div className=" m-auto mt-10">
        <h1 className="text-4xl underline mb-4 text-center">Transaction</h1>
        <form
          className="flex flex-col gap-1.5"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="bg-amber-200 p-2 rounded-md">
            Kategori :{" "}
            <input
              type="text"
              {...register("category")}
              className="focus:outline-offset-0 focus:outline-none"
            />
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

          <button className="px-3 py-1 bg-amber-100 rounded-lg w-1/2 mx-auto mt-2 cursor-pointer">
            Simpan
          </button>
        </form>

        <h3 className="text-2xl mt-7 mb-3">Riwayat</h3>
        {transactions.length > 0 ? (
          transactions.map((item) => {
            return (
              <div key={item.id} className="mt-2 bg-amber-200 p-2 rounded-sm">
                <p>Kategori: {item.category}</p>
                <p>Rekening {item.rekening}</p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">Belum ada riwayat</p>
        )}
      </div>
    </div>
  );
}
