const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

export function toAr(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => ARABIC_DIGITS[+d]);
}

export const ARABIC_MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

export function formatDateAr(date: Date): string {
  const day = toAr(date.getDate());
  const month = ARABIC_MONTHS[date.getMonth()];
  const year = toAr(date.getFullYear());
  return `${day} ${month} ${year}`;
}
