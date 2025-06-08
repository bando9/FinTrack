import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

import AssetChart from "../components/AssetChart";
import AssetForm from "../components/AssetForm";

import { columns } from "../constants/columns";
import { months } from "../constants/months";
import { calculateMonthlyTotals } from "../utils/calculateMonthlyTotals";

export default function AssetTableForm() {
  const [rowsData, setRowsData] = useState(() => {
    const savedData = localStorage.getItem("assetData");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    window.localStorage.setItem("assetData", JSON.stringify(rowsData));
  }, [rowsData]);

  const handleAddOrUpdate = (data) => {
    const assetName = data.assetInput;
    const month = data.monthInput;
    const amount = Number(data.totalInput);

    setRowsData((prevRows) => {
      const index = prevRows.findIndex((row) => row.name === assetName);

      if (index !== -1) {
        // update existing row asset
        const updatedRows = [...prevRows];
        updatedRows[index] = {
          ...updatedRows[index],
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
  };

  const monthlyTotals = calculateMonthlyTotals(rowsData, months);
  const totalRow = { id: "total", name: "Total", ...monthlyTotals };
  const rows = [...rowsData, totalRow];
  const chartData = months.map((month) => totalRow[month || 0]);

  return (
    <div className="m-10">
      <AssetChart data={chartData} labels={months} />
      <AssetForm onSubmit={handleAddOrUpdate} />

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
    </div>
  );
}
