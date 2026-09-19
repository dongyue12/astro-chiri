import { themeConfig } from '@/config';

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const VALID_SEPARATORS = ['.', '-', '/'];

export type DateFormat =
  | 'YYYY-MM-DD'
  | 'MM-DD-YYYY'
  | 'DD-MM-YYYY'
  | 'MONTH DAY YYYY'
  | 'DAY MONTH YYYY';

export function formatDate(date: Date): string {
  const format = themeConfig.date.dateFormat;
  const rawSeparator = themeConfig.date.dateSeparator.trim();
  const separator = VALID_SEPARATORS.includes(rawSeparator) ? rawSeparator : '.';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthName = MONTHS_EN[date.getMonth()];
  const pad = (num: number) => String(num).padStart(2, '0');

  switch (format) {
    case 'MM-DD-YYYY':
      return `${pad(month)}${separator}${pad(day)}${separator}${year}`;
    case 'DD-MM-YYYY':
      return `${pad(day)}${separator}${pad(month)}${separator}${year}`;
    case 'MONTH DAY YYYY':
      return `${monthName} ${day} ${year}`;
    case 'DAY MONTH YYYY':
      return `${day} ${monthName} ${year}`;
    default:
      return `${year}${separator}${pad(month)}${separator}${pad(day)}`;
  }
}
