import formatter from "../../utils/formatCurrency";

export default function CurrentDisplay({ amount }) {
  return <span>{formatter.format(amount)}</span>;
}
