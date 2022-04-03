import LogSource from "../log-source";

describe("log-source class", () => {
  describe("constructor", () => {
    const logSource = new LogSource();

    it("should set drained", () => {
      expect(logSource.drained).toBe(false);
    });

    it("should set last to a past log entry", () => {
      expect(logSource.last.date.getTime()).toBeLessThan(new Date().getTime());
    });

    it("should set count to one", () => {
      expect(logSource.count).toBe(1);
    });
  });

  describe("getNextPseudoRandomEntry method", () => {
    const logSource = new LogSource();

    const nextEntry = logSource.getNextPseudoRandomEntry();

    it("should return a logEntry with a date greater than the last", () => {
      expect(nextEntry.date.getTime()).toBeGreaterThan(
        logSource.last.date.getTime()
      );
    });
  });

  describe("pop method", () => {
    const logSource = new LogSource();

    let entry = logSource.pop();

    expect(entry && new Date() > entry.date).toBeTruthy();
    expect(entry && entry.msg).toBeTruthy();

    entry = logSource.pop();

    expect(entry && new Date() > entry.date).toBeTruthy();
    expect(entry && entry.msg).toBeTruthy();

    logSource.last.date = new Date();
    entry = logSource.pop();

    expect(entry).toBeFalsy();
  });

  test("popAsync method", async () => {
    const source = new LogSource();

    let entry = await source.popAsync();

    expect(entry && new Date() > entry.date).toBeTruthy();
    expect(entry && entry.msg).toBeTruthy();

    entry = await source.popAsync();

    expect(entry && new Date() > entry.date).toBeTruthy();
    expect(entry && entry.msg).toBeTruthy();

    source.last.date = new Date();
    entry = await source.popAsync();

    expect(entry).toBeFalsy();
  });
});
