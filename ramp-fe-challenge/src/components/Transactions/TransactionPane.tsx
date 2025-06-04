import { useContext } from "react";
import { AppContext } from "../../utils/context";
import { InputCheckbox } from "../InputCheckbox";
import { TransactionPaneComponent } from "./types";

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
}) => {
  const { transactionApprovals, setTransactionApprovals } =
    useContext(AppContext);

  // FIX BUG 7: Use global state for approval, fallback to transaction.approved
  const approved =
    transactionApprovals.get(transaction.id) ?? transaction.approved;

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} -{" "}
          {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        disabled={loading}
        onChange={async (newValue) => {
          await consumerSetTransactionApproval({
            transactionId: transaction.id,
            newValue,
          });

          // FIX BUG 7: Update global state instead of local state
          setTransactionApprovals((prev) => {
            const newMap = new Map(prev);
            newMap.set(transaction.id, newValue);
            return newMap;
          });
        }}
      />
    </div>
  );
};

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
