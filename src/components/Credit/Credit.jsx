import React from "react";
import styles from "./Credit.module.scss";
import { Button } from "../ui/Button/Button";
import { payForCredit } from "../../api/payForCredit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const getLastDate = (date, yearToAdd) => {
  const res = new Date(date);

  console.log(res)

  res.setFullYear(res.getFullYear() + yearToAdd);

  console.log(res)

  if (new Date().getTime() < res.getTime())


  return res;
};

export const Credit = ({ credit }) => {
  const navigte = useNavigate();

  const isPayed = credit.sum === credit.total_sum;
  const isPending =
    !isPayed &&
    (new Date().getTime() < getLastDate(new Date(credit.created_at), credit.term_year).getTime());

  console.log(isPayed);
  console.log(isPending);

  const onCreditPay = () => {
    let newSumToPay = credit.total_sum / credit.term_year / 12;

    if (credit.sum + newSumToPay > credit.total_sum) {
      newSumToPay = credit.total_sum - credit.sum;
    }

    payForCredit(credit.id, credit.sum, newSumToPay)
      .then(() => {
        toast.success("Payd Sucessfull");
        navigte(0);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Smth went wrong");
      });
  };

  return (
    <div
      className={classNames(
        styles.credit,
        isPayed && styles.payed,
        isPending && styles.pending
      )}
    >
      <p>Type: {credit.type}</p>
      <p>Base: {credit.base}</p>
      <p>Term (year): {credit.term_year}</p>
      <p>Percent: {credit.percent}</p>
      <p>Sum: {credit.sum}</p>
      <p>Total sum: {credit.total_sum}</p>
      <p>Create at: {credit.created_at}</p>
      <Button text="Pay" onClick={onCreditPay} />
    </div>
  );
};
