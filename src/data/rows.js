export function createDataTable(name, februari, maret, mei) {
  return { name, februari, maret, mei };
}

export const rows = [
  createDataTable("Bibit", 1115302, 3528302, 2680119),
  createDataTable("Ipot", 599999, 900000, 900000),
  createDataTable("Cash BRI", 5568020, 245399, 124888),
  createDataTable("Cash BSI", 465000, 42600, 24000),
  createDataTable("Cash Jago", 123878, 2580357, 220713),
  createDataTable("Cash Gopay", 0, 23165, 6355),
  createDataTable("Total", 7972200, 7319823, 3956075),
];
