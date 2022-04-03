import LogSource from "../lib/log-source";

describe("Log Source Behaviors", () => {
  test("It should synchronously drain a log source", () => {
    const source = new LogSource();
    let entry = source.pop();
    expect(entry && new Date() > entry.date).toBeTruthy();
    expect(entry && entry.msg).toBeTruthy();
    entry = source.pop();
    expect(entry && new Date() > entry.date).toBeTruthy();
    expect(entry && entry.msg).toBeTruthy();
    source.last.date = new Date();
    entry = source.pop();
    expect(entry).toBeFalsy();
  });

  test("It should asynchronously drain a log source", async () => {
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
