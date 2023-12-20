import React, { useEffect, useState } from "react";
import { getAllTransactions } from "../../api/getAllTransactions";
import { Transaction } from "../Transaction/Transaction";
import styles from "./TransactionsLIst.module.scss";
import { getAllAutoTransactions } from "../../api/getAllAutoTransactions";

export const TransactionsList = ({ isAutoTransactions }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (isAutoTransactions) {
      getAllAutoTransactions().then((res) => {
        setTransactions(res);
      });
    } else {
      getAllTransactions().then((res) => {
        setTransactions(res);
      });
    }
  }, []);

  return (
    <div className={styles.transactionsList}>
      {isAutoTransactions ? (
        <>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} isAuto={isAutoTransactions} />
          ))}
        </>
      ) : (
        <>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} isAuto={isAutoTransactions} />
          ))}
        </>
      )}
    </div>
  );
};
