import { getLogSources } from "../getLogSources";
import LogSource from "../log-source";

describe("getLogSources function", () => {
  describe("when called with N", () => {
    it("should return a valid array of N LogSources", () => {
      const amount = 5;

      const logSources = getLogSources(amount);

      expect(logSources).toHaveLength(amount);

      logSources.forEach((logSource) => {
        expect(logSource).toBeInstanceOf(LogSource);
      });
    });
  });
});
