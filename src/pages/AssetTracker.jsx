import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CurrentDisplay from "../components/ui/CurrentDisplay";

function createData(name, maret, mei) {
  return { name, maret, mei };
}

const rows = [
  createData("Bibit", 3528302, 2680119),
  createData("Ipot", 900000, 900000),
  createData("Cash BRI", 245399, 124888),
  createData("Cash BSI", 42600, 24000),
  createData("Total", 4716301, 3729007),
];

export default function AssetTracker() {
  return (
    <div className="m-10">
      <h1 className="mb-3 text-xl font-semibold">Asset Tracker</h1>

      <div className="w-1/2">
        <h2>Total Asset</h2>
        <ChartsOverviewDemo />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell align="center">Maret</TableCell>
              <TableCell align="center">Mei</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <CurrentDisplay amount={row.maret} />
                </TableCell>
                <TableCell align="right">
                  <CurrentDisplay amount={row.mei} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

import { BarChart } from "@mui/x-charts/BarChart";

function ChartsOverviewDemo() {
  return (
    <BarChart
      series={[
        { data: [5957224, 7972200, 7319823, 3956075, 0] },
        // { data: [51, 6, 49, 30] },
        // { data: [15, 25, 30, 50] },
      ]}
      height={290}
      xAxis={[{ data: ["Januari", "Februari", "Maret", "Mei", "Juli"] }]}
    />
  );
}
