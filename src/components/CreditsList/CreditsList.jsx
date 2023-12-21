import React, { useEffect, useState } from "react";
import styles from "./CreditsList.module.scss";
import { getAllCredits } from "../../api/getAllCredits";
import { Credit } from "../Credit/Credit";

export const CreditsList = () => {
  const [credits, setCredits] = useState([]);

  useEffect(() => {
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
