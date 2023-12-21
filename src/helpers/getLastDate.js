export const getLastDate = (date, yearToAdd) => {
  const res = new Date(date);

  res.setFullYear(res.getFullYear() + yearToAdd);

  return res;
};
