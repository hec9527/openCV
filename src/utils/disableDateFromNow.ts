export default function disableDateFromNow(date: Date) {
  const now = +new Date();
  return +date >= now;
}
