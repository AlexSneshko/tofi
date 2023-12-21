import { calculateOccurrences } from '../calculateOccurrences'; // Замените 'yourModule' на путь к вашему модулю

describe('calculateOccurrences', () => {
  test('calculates occurrences for the same day with exact start time', () => {
    const startDate = new Date('2023-01-01T12:00:00');
    const endDate = new Date('2023-01-01T23:59:59');
    const periodInDays = 1;
    const time = '12:00';

    expect(calculateOccurrences(startDate, endDate, periodInDays, time)).toBe(1);
  });

  test('calculates occurrences for the same day with start time after specified time', () => {
    const startDate = new Date('2023-01-01T14:00:00');
    const endDate = new Date('2023-01-01T23:59:59');
    const periodInDays = 1;
    const time = '12:00';

    expect(calculateOccurrences(startDate, endDate, periodInDays, time)).toBe(1);
  });

  test('calculates occurrences for a long period with irregular start time', () => {
    const startDate = new Date('2023-01-01T18:00:00');
    const endDate = new Date('2023-02-01T18:00:00');
    const periodInDays = 7;
    const time = '12:00';

    expect(calculateOccurrences(startDate, endDate, periodInDays, time)).toBe(5);
  });

  test('returns 0 occurrences for an end date before the start date', () => {
    const startDate = new Date('2023-01-10');
    const endDate = new Date('2023-01-01');
    const periodInDays = 1;
    const time = '12:00';

    expect(calculateOccurrences(startDate, endDate, periodInDays, time)).toBe(0);
  });

  // Добавьте другие тесты, если необходимо
});
