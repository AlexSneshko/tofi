import { getLastDate } from '../getLastDate'; 

describe('getLastDate', () => {
  test('returns the correct date for the next year', () => {
    const currentDate = new Date('2023-01-15');
    const yearToAdd = 1;

    const result = getLastDate(currentDate, yearToAdd);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); 
    expect(result.getDate()).toBe(15);
  });

  test('returns the correct date for two years later', () => {
    const currentDate = new Date('2023-05-20');
    const yearToAdd = 2;

    const result = getLastDate(currentDate, yearToAdd);

    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(4); 
    expect(result.getDate()).toBe(20);
  });

  test('returns the same date for zero years to add', () => {
    const currentDate = new Date('2023-12-31');
    const yearToAdd = 0;

    const result = getLastDate(currentDate, yearToAdd);

    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(11); 
    expect(result.getDate()).toBe(31);
  });

  test('returns the correct date for a negative year to add', () => {
    const currentDate = new Date('2023-06-10');
    const yearToAdd = -1;

    const result = getLastDate(currentDate, yearToAdd);

    expect(result.getFullYear()).toBe(2022);
    expect(result.getMonth()).toBe(5);
    expect(result.getDate()).toBe(10);
  });
});
