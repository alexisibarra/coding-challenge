import { getLogSources } from "../../lib/getLogSources";
import Printer from "../../lib/printer";
import syncSortedMerge from "../sync-sorted-merge";

describe("syncSortedMerge function", () => {
  it("should print all log entries util all log sources are drained", () => {
    const logSources = getLogSources(2);
    const printer = new Printer();

    const logSpy = jest.spyOn(console, "log");

    syncSortedMerge(logSources, printer);

    const allLogSourcesAreDrained = logSources.every(
      (logSource) => logSource.drained
    );

    expect(allLogSourcesAreDrained).toBeTruthy();

    // when printer.done is called, 5 console.logs are done
    expect(logSpy).toBeCalledTimes(printer.logsPrinted + 5);
  });

  it("should throw an error when called with an empty array for log sources", () => {
    const logSources = getLogSources(0);
    const printer = new Printer();

    expect(() => syncSortedMerge(logSources, printer)).toThrow(
      "logSources array must have at least one element"
    );
  });
});
