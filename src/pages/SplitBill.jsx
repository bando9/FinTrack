import React from "react";

export default function SplitBill() {
  return (
    <div className="p-10 mx-auto">
      <h1 className="mb-5 font-bold text-xl">SplitBill</h1>

      <div className="p-3 flex">
        <div className="con-left w-1/3">
          <div className="card w-4/5 bg-gray-300 rounded-xl p-3 mb-3 flex items-center justify-center gap-3">
            <div className="image rounded-full bg-amber-400 w-10 h-10 flex items-center justify-center ">
              <p className="">HW</p>
            </div>
            <div className="">
              <h2 className="text-lg font-semibold">Budi</h2>
              <p className="text-sm text-red-600 font-semibold">
                Kamu berhutang Rp 7 ke Budi
              </p>
            </div>
            <button className="px-2 py-1 bg-blue-300 rounded-md font-semibold text-gray-800">
              Tutup
            </button>
          </div>

          <div className="card w-4/5 bg-gray-300 rounded-xl p-3 mb-3 flex items-center justify-center gap-3">
            <div className="image rounded-full bg-amber-400 w-10 h-10 flex items-center justify-center ">
              <p className="">HW</p>
            </div>
            <div className="">
              <h2 className="text-lg font-semibold">Budi</h2>
              <p className="text-sm text-red-600 font-semibold">
                Kamu berhutang Rp 7 ke Budi
              </p>
            </div>
            <button className="px-2 py-1 bg-blue-300 rounded-md font-semibold text-gray-800">
              Tutup
            </button>
          </div>

          <button className="px-2 py-1 bg-blue-300 rounded-md font-semibold text-gray-800">
            Tambah Teman
          </button>
        </div>

        <div className="con-right w-1/3 p-4 bg-gray-200 rounded-lg">
          <h2 className="mb-4 font-bold text-xl ">Patungan Bareng budi</h2>
          <form className=" flex flex-col gap-2">
            <label>
              💵 Total Biaya{" "}
              <input
                type="text"
                className="border-1 bg-white border-white rounded-sm"
              />
            </label>

            <label>
              🙋‍♂️ Pengeluaran Kamu{" "}
              <input
                type="number"
                className="border-1 bg-white border-white rounded-sm"
              />
            </label>

            <label>
              🙋 Pengeluaran Budi{" "}
              <span className="border-1 bg-white border-white rounded-sm px-2">
                150
              </span>
            </label>
            <label>
              🤑 Ditalangin sama{" "}
              <select className="border-1 bg-white border-white rounded-sm px-1">
                <option value="Kamu" selected>
                  Kamu
                </option>
                <option value="Kamu">Budi</option>
              </select>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
