import { useState } from "react";

export default function Transaction() {
  const today = new Date().toDateString();

  const [category, setCategory] = useState("");
  const [rekening, setRekening] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [catatan, setCatatan] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [appt, setAppt] = useState("");

  const addTransaction = (e) => {
    e.preventDefault();
    console.log("tambah transaksi");
    console.log(e.target[0].value);
    setCategory(e.target[0].value);

    console.log(e.target[1].value);
    setRekening(e.target[1].value);

    console.log(e.target[2].value);
    setJumlah(e.target[2].value);

    console.log(e.target[3].value);
    setCatatan(e.target[3].value);

    console.log(e.target[4].value);
    setTimestamp(e.target[4].value);

    console.log(e.target[5].value);
    setAppt(e.target[5].value);
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
    e.target[4].value = "";
    e.target[5].value = "";
  };

  return (
    <div className="w-1/2 flex m-auto bg-amber-300 rounded-2xl pb-10">
      <div className="text-center m-auto mt-10">
        <h1 className="text-4xl underline mb-3">Transaction</h1>
        <form action="#" onSubmit={addTransaction}>
          <div>
            <label htmlFor="category">Kategori </label>
            <input
              type="text"
              id="category"
              // onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="rek">Rekening </label>
            <select>
              <option>Pilih Rekening</option>
              <option value="CIMB Niaga">CIMB Niaga</option>
              <option value="BRI">BRI</option>
              <option value="Jago">Jago</option>
              <option value="Gopay">Gopay</option>
            </select>
          </div>
          <div>
            <label htmlFor="jumlah">Jumlah </label>
            <input type="number" />
          </div>
          <div>
            <label htmlFor="catatan">Catatan </label>
            <input type="text" />
          </div>
          <div>
            <input placeholder={today} type="date" />
          </div>
          <div>
            <input type="time" />
          </div>
          <button type="submit">Simpan</button>
        </form>
        <h3 className="text-2xl mt-7 mb-3">Riwayat</h3>
        {category ? (
          <ul>
            {category && <li>{category}</li>}
            {rekening && <li>{rekening}</li>}
            {jumlah && <li>{jumlah}</li>}

            {catatan && <li>{catatan}</li>}
            {timestamp && (
              <li>
                {timestamp}
                {appt && `, ${appt}`}
              </li>
            )}
          </ul>
        ) : (
          <p className="text-gray-500">Belum ada riwayat</p>
        )}
        <Balance />
      </div>
    </div>
  );
}

function Balance() {
  const income = 3500000;
  const expense = 2500000;
  const total = income - expense;

  return (
    <div className="bg-amber-200 m-10 rounded-4xl p-4">
      <div className="mb-5">
        <h1 className=" text-xl mb-2 font-semibold underline">Balance</h1>
        <p>
          Pemasukan: <CurrentDisplay amount={income} />
        </p>
        <p>
          Pengeluaran: <CurrentDisplay amount={expense} />
        </p>
        <p>
          Total saldo: <CurrentDisplay amount={total} />
        </p>
      </div>

      <h1 className=" text-xl mb-3 font-semibold underline">
        Riwayat Transaksi
      </h1>

      <div className="text-left bg-amber-100 px-2 rounded-xl">
        <p>Beli Bensin</p>
        <p>
          <CurrentDisplay amount={20000} />{" "}
        </p>
        <p>Rek: cash fiat</p>
        <p>Selasa, 27 Mei 2025. 19:20</p>
      </div>
    </div>
  );
}

function CurrentDisplay({ amount }) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return <span>{formatter.format(amount)}</span>;
}
