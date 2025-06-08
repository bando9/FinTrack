export const calculateMonthlyTotals = (rows, months) => {
  const totals = {};
  months.forEach((month) => {
    totals[month] = rows.reduce((acc, row) => {
      const value = Number(row[month]);
      return acc + (isNaN(value) || row[month] === null ? 0 : value);
    }, 0);
  });
  return totals;
};
