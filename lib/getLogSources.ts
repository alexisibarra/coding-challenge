import LogSource from "./log-source";

export const getLogSources = (sourceCount: number) =>
  [...Array(sourceCount)].map(() => new LogSource());
