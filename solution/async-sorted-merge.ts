import Heap = require("heap");

import LogSource from "../lib/log-source";
import Printer from "../lib/printer";
import { compareLogSourcesDates } from "../lib/compareLogSourcesDates";

// Print all entries, across all of the *async* sources, in chronological order.

type TAsyncSortedMerge = (
  logSources: LogSource[],
  printer: Printer
) => Promise<void>;

const asyncSortedMerge: TAsyncSortedMerge = async (logSources, printer) => {
  const heap: Heap<LogSource> = new Heap(compareLogSourcesDates);

  logSources.forEach((logSource) => {
    heap.push(logSource);
  });

  while (!heap.empty()) {
    const minimumLogSource = heap.peek();

    printer.print(minimumLogSource.last);

    await minimumLogSource.popAsync();

    if (minimumLogSource.drained) {
      heap.pop();
    } else {
      heap.replace(minimumLogSource);
    }
  }

  printer.done();

  // console.log({ logSources });
  // console.log({ logsCount });
  // console.log({ logsCount: logsCount.reduce((a, b) => a + b, 0) });
  console.log({
    logSourcesCount: logSources.reduce((a, b) => a + b.count, 0),
  });
};

export default asyncSortedMerge;
