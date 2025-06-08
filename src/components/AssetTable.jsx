import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

import { useForm } from "react-hook-form";
import { useState } from "react";

const columns = [
  { field: "name", headerName: "Asset", width: 100 },
  { field: "Januari", headerName: "Januari", type: "number", width: 120 },
  { field: "February", headerName: "Februari", type: "number", width: 120 },
  {
    field: "March",
    headerName: "Maret",
    type: "number",
    width: 120,
  },
];

const originalRows = [
  {
    id: 1,
    name: "Bibit",
    Januari: 1949679,
    February: 1115302,
    March: 0,
  },
  {
    id: 2,
    name: "Ipot",
    Januari: 8824333,
    February: 2,
    March: 0,
  },
];

const months = ["Januari", "February", "March"];

export default function AssetTableForm() {
  const { register, handleSubmit } = useForm();

  const [rows, setRows] = useState();
  const [asset, setAsset] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  // menampilkan jumlah total
  const calculateMonthlyTotals = (rows) => {
    const totals = {};
    months.forEach((month) => {
      totals[month] = rows.reduce((acc, row) => {
        const value = Number(row[month]);
        return acc + (isNaN(value) || row[month] === null ? 0 : value);
      }, 0);
    });
    return totals;
  };
  const monthlyTotals = calculateMonthlyTotals(originalRows);
  const totalRow = {
    id: "total",
    name: "Total",
    ...monthlyTotals,
  };
  // const rowSum = [...originalRows, totalRow];

  const onSubmit = () => {
    if (!asset || !month || !amount) return;
    setRows((prev) => {
      const updated = [...prev, totalRow];
      const index = updated.findIndex((row) => row.name === asset);

      if (index !== -1) {
        updated[index] = {
          ...updated[index],
          [month]: Number(amount),
        };
      } else {
        const newRow = {
          id: Date.now(),
          name: asset,
        };
        months.forEach((m) => {
          newRow[m] = m === month ? Number(amount) : null;
        });
        updated.push(newRow);
      }

      return updated;
    });

    setAsset("");
    setAmount("");
    setMonth("");
  };

  return (
    <>
      <div>
        <h1 className="mb-5">Form</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
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
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
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

          <button className="bg-amber-200 p-1 rounded-md mt-2">Kirim</button>
        </form>
      </div>

      <Box sx={{ width: "100%", p: 2 }}>
        <Paper sx={{ height: 300, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
            getRowClassName={(params) =>
              params.row.id === "total" ? "total-row" : ""
            }
            sx={{
              border: 0,
              "& .total-row": {
                backgroundColor: "#f8f9fa",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#e9ecef",
                },
              },
            }}
          />
        </Paper>
      </Box>
    </>
  );
}
