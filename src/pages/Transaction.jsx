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
    <div>
      <h1>Transaction</h1>
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

      <ul>
        <h3>Masuk</h3>
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
    </div>
  );
}
