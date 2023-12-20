import React, { useEffect, useState } from "react";
import styles from "./TransferForm.module.scss";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/Button/Button";
import Select from "react-select";
import { getUserAccounts } from "../../api/getUserAccount";
import { makeTransaction } from "../../api/makeTransaction";
import { createAutoTransaction } from "../../api/createAutoTransaction";

export const TransferForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: { autoTransactionHours: 12, autoTransactionMinutes: 0 },
  });
  const [accountsList, setAccountsList] = useState([]);
  const [isAutoTransaction, setIsAutoTransaction] = useState(false);

  const formatTo2Digits = (number) => (number > 9 ? number : `0${number}`);

  const onSubmit = (data) => {
    //750c3e9e-5b76-46d4-bc21-ab2b5157c0e7

    if (isAutoTransaction) {
      const time = `${formatTo2Digits(
        data.autoTransactionHours
      )}:${formatTo2Digits(data.autoTransactionMinutes)}:00`;

      createAutoTransaction(
        data.fromUserAccounSelect.value,
        data.toUserAccount,
        data.amount,
        time,
        data.autoTransactionDayPeriodicity,
        data.autoTransactionLastDate
      ).then(() => {
        toast.success("transaction created successfull");
      }).catch((error) => {
        console.log(error)
        toast.error("Pleace check recipient id");
      });
    } else {
      makeTransaction(
        data.fromUserAccounSelect.value,
        data.toUserAccount,
        data.amount
      ).then(() => {
        toast.success("transaction created successfull");
      }).catch(() => {
        toast.error("Pleace check recipient id");
      });

      // console.log(error)
      // if (error) {
      //   toast.error("Pleace check recipient id");
      // } else {
      //   toast.success("transaction created successfull");
      // }
    }
  };

  const onFormError = (data) => {
    toast.error("(((");
    console.log(data);
  };

  const accountsListOptions = accountsList.map((account) => {
    return {
      value: account.id,
      label: account.id,
    };
  });

  const getCurrentDay = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    return yyyy + "-" + mm + "-" + dd;
  };

  useEffect(() => {
    getUserAccounts().then((accounts) => {
      setAccountsList(accounts);
    });
  }, []);

  return (
    <>
      <h1>Transfer form</h1>
      <form
        className={styles.TransferForm}
        onSubmit={handleSubmit(onSubmit, onFormError)}
      >
        <div>
          <h3>From Account</h3>
          <Controller
            name="fromUserAccounSelect"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} options={accountsListOptions} />
            )}
          />
        </div>
        <div>
          <h3>To</h3>
          <input
            className={errors.toUserAccount && styles.error}
            placeholder="User's account"
            {...register("toUserAccount", { required: true })}
          />
        </div>
        <div>
          <h3>Amount</h3>
          <input
            className={errors.amount && styles.error}
            placeholder="Amount"
            {...register("amount", {
              required: true,
              valueAsNumber: true,
              validate: (value) => value > 0,
            })}
          />
        </div>
        <div className={styles.showAutoTransactionContainer}>
          <span>Make Auto Transaction</span>
          <input
            type="checkbox"
            onChange={() => setIsAutoTransaction(!isAutoTransaction)}
          />
        </div>
        {isAutoTransaction && (
          <>
            <div>
              <h3>Time</h3>
              <h4>Hours</h4>
              <input
                className={errors.amount && styles.error}
                type="number"
                placeholder="Hours"
                {...register("autoTransactionHours", {
                  required: isAutoTransaction,
                  valueAsNumber: true,
                  validate: (value) => value > 0,
                })}
              />
              <h4>Minutes</h4>
              <input
                className={errors.autoTransactionMinutes && styles.error}
                type="number"
                placeholder="Minutes"
                {...register("autoTransactionMinutes", {
                  required: isAutoTransaction,
                  valueAsNumber: true,
                  validate: (value) => value >= 0 && value < 60,
                })}
              />
            </div>
            <div>
              <h3>Day periodicity</h3>
              <input
                className={errors.autoTransactionDayPeriodicity && styles.error}
                type="number"
                placeholder="Day periodicity"
                {...register("autoTransactionDayPeriodicity", {
                  required: isAutoTransaction,
                  valueAsNumber: true,
                  validate: (value) => value > 0,
                })}
              />
            </div>
            <div>
              <h3>Last date</h3>
              <input
                className={errors.autoTransactionLastDate && styles.error}
                type="date"
                min={getCurrentDay()}
                placeholder="Last Date"
                {...register("autoTransactionLastDate", {
                  required: isAutoTransaction,
                })}
              />
            </div>
          </>
        )}
        <Button text={"Transfer"} />
      </form>
    </>
  );
};
