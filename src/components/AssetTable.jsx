import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { useNotifications } from "@toolpad/core";

import { useForm } from "react-hook-form";

import { useState, useEffect } from "react";

const columns = [
  { field: "name", headerName: "Asset", width: 100 },
  { field: "Januari", headerName: "Januari", type: "number", width: 120 },
  { field: "February", headerName: "Februari", type: "number", width: 120 },
  { field: "March", headerName: "Maret", type: "number", width: 120 },
  { field: "April", headerName: "April", type: "number", width: 120 },
  { field: "May", headerName: "Mei", type: "number", width: 120 },
  { field: "June", headerName: "Juni", type: "number", width: 120 },
  { field: "July", headerName: "Juli", type: "number", width: 120 },
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

const months = ["Januari", "February", "March", "April", "May", "June", "July"];

export default function AssetTableForm() {
  const notifications = useNotifications();

  const { register, handleSubmit } = useForm();

  const [rowsData, setRowsData] = useState(() => {
    const savedData = localStorage.getItem("assetData");
    return savedData ? JSON.parse(savedData) : originalRows;
  });

  const onSubmit = (data, e) => {
    console.log(data);
    const assetName = data.assetInput;
    const month = data.monthInput;
    const amount = Number(data.totalInput);

    setRowsData((prevRows) => {
      const existingRowIndex = prevRows.findIndex(
        (row) => row.name === assetName
      );

      if (existingRowIndex !== -1) {
        // update existing row asset
        const updatedRows = [...prevRows];
        updatedRows[existingRowIndex] = {
          ...updatedRows[existingRowIndex],
          [month]: amount,
        };
        return updatedRows;
      } else {
        const newRow = {
          id: Date.now(),
          name: assetName,
          [month]: amount,
        };
        return [...prevRows, newRow];
      }
    });

    e.target.reset();
  };

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
  const monthlyTotals = calculateMonthlyTotals(rowsData);
  const totalRow = {
    id: "total",
    name: "Total",
    ...monthlyTotals,
  };
  const rows = [...rowsData, totalRow];

  useEffect(() => {
    window.localStorage.setItem("assetData", JSON.stringify(rowsData));
  }, [rowsData]);

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
              <option value="BRI">BRI</option>
              <option value="BSI">BSI</option>
              <option value="Jago">Bank Jago</option>
              <option value="Gopay">Go-pay</option>
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
              <option value="February">Februari</option>
              <option value="March">Maret</option>
              <option value="April">April</option>
              <option value="May">Mei</option>
              <option value="June">Juni</option>
              <option value="July">Juli</option>
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

          <button
            onClick={() => {
              notifications.show("Transaksi berhasil ditambahkan!", {
                severity: "success",
                autoHideDuration: 3000,
              });
            }}
            className="bg-amber-200 p-1 rounded-md mt-2"
          >
            Kirim
          </button>
        </form>
      </div>

      <Box sx={{ width: "100%", p: 2 }}>
        <Paper sx={{ height: 400, width: "100%" }}>
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
