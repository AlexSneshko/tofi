import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./CreateCreditForm.module.scss";
import { toast } from "react-toastify";
import { Button } from "../ui/Button/Button";
import Select from "react-select";
import { createCredit } from "../../api/createCredit";

const CREDIT_MAX_YEARS_COUNT = 5;

const accountsListOptions = [...Array(CREDIT_MAX_YEARS_COUNT).keys()].map(
  (_, i) => {
    if (i === 0) {
      return { label: `1 year`, value: 1 };
    }
    return { label: `${i + 1} years`, value: i + 1 };
  }
);

const creditListOprions = [
  { label: "Annuity", value: "annuity" },
  { label: "Differentiated", value: "differentiated" },
];

export const CreateCreditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
    watch
  } = useForm({defaultValues:{
    'creditTerm': accountsListOptions[0],
    'creditType': creditListOprions[0],
    'creditYearPercentage': 12
  }});

  const [result, setResult] = useState()
  const watchedValues = watch();

  const countTotalSum = (creditTerm) => (result * creditTerm * 12).toFixed(2);

  const onSubmit = (data) => {
    // console.log(data);
    const totalSum = countTotalSum(data.creditTerm.value)
    // console.log(data.creditType.value, data.amount, data.creditTerm, data.creditYearPercentage, totalSum)
    createCredit(data.creditType.value, data.amount, data.creditTerm.value, data.creditYearPercentage, totalSum).then(() => {
      toast.success('Created successfully')
    }).catch(() => {
      toast.error('Smth went wrong')
    })
  };

  const onFormError = (data) => {
    toast.error("(((");
    console.log(data);
  };



  // const countCreditMonthPercentage = (creditYearPercentage) => creditYearPercentage / 12;

  const countMonthlyPaymentAmount = (amount, creditYearPercentage, yearCount) => {
    const monthPercentage = creditYearPercentage / 12 / 100;

    return amount * monthPercentage / (1 - Math.pow(1 + monthPercentage, -yearCount * 12 ))
  }

  // const a = useCallback(getValues())


  // useEffect(() => {
  //   // setFormData(getValues());
  //   setResult(getValues(['amount', 'creditTerm', 'creditType', 'creditYearPercentage']))
  //   console.log(getValues('amount'))
  //   // console.log(getValues())
  //   // setResult(getValues('amount'), getValues('creditYearPercentage'), getValues('creditTerm'))
  // }, [getValues()]);
  useEffect(() => {
    // setResult(countMonthlyPaymentAmount(watchedValues.amount, watchedValues.creditYearPercentage, watchedValues.creditTerm.value))
    // console.log(watchedValues.amount, watchedValues.creditYearPercentage, watchedValues.creditTerm.value)
    setResult(countMonthlyPaymentAmount(watchedValues.amount, watchedValues.creditYearPercentage, watchedValues.creditTerm.value).toFixed(2))
  }, [watchedValues])

  return (
    <>
      <h1>Create credit form</h1>
      <form
        className={styles.CreateCreditForm}
        onSubmit={handleSubmit(onSubmit, onFormError)}
      >
        <div>
          <h3>Amount</h3>
          <input
            className={errors.amount && styles.error}
            placeholder="Amount of credit"
            {...register("amount", {
              required: true,
              valueAsNumber: true,
              validate: (value) => value > 0,
            })}
          />
        </div>
        <div>
          <h3>Term</h3>
          <Controller
            name="creditTerm"
            control={control}
            rules={{ required: true }}
            // defaultValue={accountsListOptions[0]}
            render={({ field }) => (
              <Select {...field} options={accountsListOptions} />
            )}
          />
        </div>
        <div>
          <h3>Type</h3>
          <Controller
            name="creditType"
            control={control}
            rules={{ required: true }}
            // defaultValue={creditListOprions[0]}
            render={({ field }) => (
              <Select {...field} options={creditListOprions} />
            )}
          />
        </div>
        <div>
          <h3>Percentage rate</h3>
          <input
            className={errors.amount && styles.error}
            placeholder="Percentage year rate"
            {...register("creditYearPercentage", {
              required: true,
              valueAsNumber: true,
              validate: (value) => value > 0 && value < 100,
            })}
          />
        </div>

        <h2>Monthly payment: {result}</h2>
        <h2>Total payment: {countTotalSum(watchedValues.creditTerm.value)}</h2>
        <Button text={"Transfer"} type='submit' />
      </form>
    </>
  );
};
