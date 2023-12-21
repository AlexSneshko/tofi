import { formatTo2Digits } from '../formatTo2Digits';

describe('formatTo2Digits', () => {
  test('formats single-digit number to two digits', () => {
    expect(formatTo2Digits(5)).toBe('05');
  });

  test('does not change double-digit number', () => {
    expect(formatTo2Digits(15)).toBe(15);
  });

  test('formats zero to two digits', () => {
    expect(formatTo2Digits(0)).toBe('00');
  });

  test('returns string for single-digit input', () => {
    expect(formatTo2Digits(8)).toBe('08');
  });

  test('returns string for double-digit input', () => {
    expect(formatTo2Digits(23)).toBe(23);
  });
});
