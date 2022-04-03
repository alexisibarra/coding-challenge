import Heap = require("heap");

import LogSource from "../lib/log-source";
import Printer from "../lib/printer";
import { compareLogSourcesDates } from "../lib/compareLogSourcesDates";

// Print all entries, across all of the sources, in chronological order.

type TSyncSortedMerge = (logSources: LogSource[], printer: Printer) => void;

const syncSortedMerge: TSyncSortedMerge = (logSources, printer) => {
  if (logSources.length === 0) {
    throw new Error("logSources array must have at least one element");
  }

  const heap: Heap<LogSource> = new Heap(compareLogSourcesDates);

  logSources.forEach((logSource) => {
    heap.push(logSource);
  });

  while (!heap.empty()) {
    const minimumLogSource = heap.peek();

    printer.print(minimumLogSource.last);

    minimumLogSource.pop();

    if (minimumLogSource.drained) {
      heap.pop();
    } else {
      heap.replace(minimumLogSource);
    }
  }

  printer.done();
};

export default syncSortedMerge;
