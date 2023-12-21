export const countMonthlyPaymentAmount = (amount, creditYearPercentage, yearCount) => {
  const monthPercentage = creditYearPercentage / 12 / 100;

  return (
    (amount * monthPercentage) /
    (1 - Math.pow(1 + monthPercentage, -yearCount * 12))
  );
};
