import { countMonthlyPaymentAmount } from '../countMonthlyPaymentAmount'; // Замените 'yourModule' на путь к вашему модулю

describe('countMonthlyPaymentAmount', () => {
  test('calculates monthly payment for a 3-year loan with 5% interest', () => {
    const amount = 5000;
    const creditYearPercentage = 5;
    const yearCount = 3;

    expect(countMonthlyPaymentAmount(amount, creditYearPercentage, yearCount)).toBeCloseTo(149.85, 2);
  });

  test('calculates monthly payment for a 5-year loan with 10% interest', () => {
    const amount = 10000;
    const creditYearPercentage = 10;
    const yearCount = 5;

    expect(countMonthlyPaymentAmount(amount, creditYearPercentage, yearCount)).toBeCloseTo(212.47, 2);
  });

  test('calculates monthly payment for a 10-year loan with 7% interest', () => {
    const amount = 20000;
    const creditYearPercentage = 7;
    const yearCount = 10;

    expect(countMonthlyPaymentAmount(amount, creditYearPercentage, yearCount)).toBeCloseTo(232.22, 2);
  });

  test('calculates monthly payment for a loan with 15% interest and decimal amounts', () => {
    const amount = 12345.67;
    const creditYearPercentage = 15;
    const yearCount = 2;

    expect(countMonthlyPaymentAmount(amount, creditYearPercentage, yearCount)).toBeCloseTo(598.60, 2);
  });
});
