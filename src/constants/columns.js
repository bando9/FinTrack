import { months } from "./months";

export const columns = [
  { field: "name", headerName: "Asset", width: 100 },
  ...months.map((month) => ({
    field: month,
    headerName: month,
    type: "number",
    width: 120,
  })),
];
