import React from "react";

export default function Dashboard() {
  return (
    <div className="mt-10 m-10">
      <h1>Dashboard</h1>

      <p>
        menampilkan chart bisa pake{" "}
        <a href="https://recharts.org/en-US/examples/TwoLevelPieChart">
          Rechart
        </a>{" "}
        atau{" "}
        <a href="https://www.chartjs.org/docs/latest/samples/other-charts/pie.html">
          chart.js
        </a>
      </p>
      <Balance />
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
