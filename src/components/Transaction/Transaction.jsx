import React from "react";
import styles from "./Transaction.module.scss";
import { Button } from "../ui/Button/Button";
import { calculateOccurrences } from "../../helpers/calculateOccurrences";
import { makeAutoTransaction } from "../../api/makeAutoTransaction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Transaction = ({ transaction, isAuto }) => {
  const navigate = useNavigate();

  let isDone;
  let isReady;

  if (isAuto) {
    isDone = transaction.current_count === transaction.total_count;
    isReady =
      calculateOccurrences(
        new Date(transaction.created_at),
        new Date(),
        transaction.day_periodicity,
        transaction.time
      ) -
        1 >
      transaction.current_count;
  }

  const onMakeAutoTransaction = () => {
    makeAutoTransaction(
      transaction.id,
      transaction.from_account_id,
      transaction.to_account_id,
      transaction.sum,
      transaction.current_count
    )
      .then(() => {
        toast.success("Transaction made successfully");
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Smth went wrong");
      });
  };

  return (
    <div className={styles.transaction}>
      <p>From: {transaction.from.profile_id}</p>
      <p>To: {transaction.to.profile_id}</p>
      <p>Sum: {transaction.sum}</p>
      <p>Time: {transaction.created_at}</p>
      {isAuto && (
        <>
          <p>Time: {transaction.time}</p>
          <p>Day periodocity: {transaction.day_periodicity}</p>
          <p>Last date: {transaction.last_date}</p>
          <p>Current count: {transaction.current_count}</p>
          <p>Total count: {transaction.total_count}</p>
          {!isDone && isReady && (
            <Button text={"Make transaction"} onClick={onMakeAutoTransaction} />
          )}
        </>
      )}
    </div>
  );
};
