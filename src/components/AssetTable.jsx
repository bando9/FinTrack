import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

const columns = [
  { field: "name", headerName: "Asset", width: 100 },
  { field: "januari", headerName: "Januari", type: "number", width: 120 },
  { field: "february", headerName: "Februari", type: "number", width: 120 },
  { field: "march", headerName: "Maret", type: "number", width: 120 },
  { field: "april", headerName: "April", type: "number", width: 120 },
  { field: "mei", headerName: "Mei", type: "number", width: 120 },
  { field: "june", headerName: "Juni", type: "number", width: 120 },
  { field: "july", headerName: "Juli", type: "number", width: 120 },
  { field: "august", headerName: "Agustus", type: "number", width: 120 },
];

const originalRows = [
  {
    id: 1,
    name: "Bibit",
    januari: 1949679,
    february: 1115302,
    march: 3528302,
    april: 131213,
    mei: 1331312,
    june: null,
    july: 312123,
    august: 19,
  },
  {
    id: 2,
    name: "Ipot",
    januari: 8824333,
    february: 2,
    march: 3,
    april: 124001,
    mei: 44233,
    june: 312,
    july: 3234,
    august: 839,
  },
];

const months = [
  "januari",
  "february",
  "march",
  "april",
  "mei",
  "june",
  "july",
  "august",
];

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

const rows = [...originalRows, totalRow];

export default function AssetTableForm() {
  return (
    <>
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
