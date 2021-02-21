/**
 * convert a string datetime to unix timestamp.
 * This is only required because FF doesn't parse date strings
 * the same way as Chrome.
 * @param strDate - the date to convert
 * @return unix timestamp (the only time a man needs)
 */
export function strDateToUnix(strDate: string): number
{
  return Date.parse(strDate.replace(/-/g, " "));
}
