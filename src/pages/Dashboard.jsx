import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  return (
    <div className="mt-3 m-10">
      <h1>Dashboard</h1>
      <div className="w-1/3 mx-auto ">
        <Doughnut data={dataChart} />
      </div>

      <Balance />
    </div>
  );
}

const dataChart = {
  labels: ["Pemasukan", "Pengeluaran"],
  datasets: [
    {
      label: "",
      data: [3500000, 2500000],
      backgroundColor: [
        "rgba(54, 162, 235, 0.3)",
        "rgba(255, 99, 132, 0.3)",
        // "rgba(255, 206, 86, 0.2)",
        // "rgba(75, 192, 192, 0.2)",
        // "rgba(153, 102, 255, 0.2)",
        // "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        // "rgba(255, 206, 86, 1)",
        // "rgba(75, 192, 192, 1)",
        // "rgba(153, 102, 255, 1)",
        // "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
      hoverOffset: 25,
    },
  ],
};

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
