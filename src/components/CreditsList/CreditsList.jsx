import React, { useEffect, useState } from "react";
import styles from "./CreditsList.module.scss";
import { getAllCredits } from "../../api/getAllCredits";
import { Credit } from "../Credit/Credit";

export const CreditsList = () => {
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    // if (isAutoTransactions) {
    //   getAllAutoTransactions().then((res) => {
    //     setTransactions(res);
    //   });
    // } else {
    //   getAllTransactions().then((res) => {
    //     setTransactions(res);
    //   });
    // }
    getAllCredits().then((res) => {
      setCredits(res)
    })
  }, []);

  return (
    <div className={styles.creditsList}>
      {credits.map((credit) => (
        <Credit key={credit.id} credit={credit} />
      ))}
    </div>
  );
};
