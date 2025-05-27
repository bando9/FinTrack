import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Menampilkan Total Pemasukan, Pengeluaran dan Saldo</p>
      <p>inspirasi dari figma community</p>
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
    </div>
  );
}
