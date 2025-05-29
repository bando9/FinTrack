// components/AssetTable.jsx
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CurrentDisplay from "../components/ui/CurrentDisplay";

export default function AssetTable({ rows }) {
  const months = ["Februari", "Maret", "Mei"];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="asset table">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            {months.map((month) => (
              <TableCell align="center" key={month}>
                {month}
              </TableCell>
            ))}
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
              {months.map((month) => (
                <TableCell align="right" key={month}>
                  <CurrentDisplay amount={row[month.toLowerCase()]} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
