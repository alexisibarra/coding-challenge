import LogSource from "./log-source";

type TCompareLogSourcesDates = (a: LogSource, b: LogSource) => 1 | -1;

export const compareLogSourcesDates: TCompareLogSourcesDates = (
  logSource_a,
  logSource_b
) => {
  const date_a = logSource_a.last.date;
  const date_b = logSource_b.last.date;

  return date_a < date_b ? -1 : 1;
};
