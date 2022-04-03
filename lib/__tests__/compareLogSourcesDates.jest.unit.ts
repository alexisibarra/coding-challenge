import { compareLogSourcesDates } from "../compareLogSourcesDates";
import LogSource from "../log-source";

describe("compareLogSourcesDates function", () => {
  it("should return 1 when the first log source date is greater than the second", () => {
    const logSource_a = new LogSource();
    const logSource_b = new LogSource();

    logSource_a.last.date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 5);
    logSource_b.last.date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 4);

    expect(compareLogSourcesDates(logSource_a, logSource_b)).toBe(-1);
  });

  it("should return -1 when the first log source date is less than the second", () => {
    const logSource_a = new LogSource();
    const logSource_b = new LogSource();

    logSource_a.last.date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 4);
    logSource_b.last.date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 5);

    expect(compareLogSourcesDates(logSource_a, logSource_b)).toBe(1);
  });
});
