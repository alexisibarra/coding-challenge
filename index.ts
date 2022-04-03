import { getLogSources } from "./lib/getLogSources";
import Printer from "./lib/printer";
import asyncSortedMerge from "./solution/async-sorted-merge";
import syncSortedMerge from "./solution/sync-sorted-merge";

const runSolutions = async (sourceCount: number) => {
  await new Promise((resolve, reject) => {
    /**
     * Challenge Number 1!
     *
     * Assume that a LogSource only has one method: pop() which will return a LogEntry.
     *
     * A LogEntry is simply an object of the form:
     * {
     * 		date: Date,
     * 		msg: String,
     * }
     *
     * All LogEntries from a given LogSource are guaranteed to be popped in chronological order.
     * Eventually a LogSource will end and return boolean false.
     *
     * Your job is simple: print the sorted merge of all LogEntries across `n` LogSources.
     *
     * Call `printer.print(logEntry)` to print each entry of the merged output as they are ready.
     * This function will ensure that what you print is in fact in chronological order.
     * Call 'printer.done()' at the end to get a few stats on your solution!
     */
    const syncLogSources = getLogSources(sourceCount);

    try {
      syncSortedMerge(syncLogSources, new Printer());
      resolve(100);
    } catch (e) {
      reject(e);
    }
  });

  return new Promise((resolve_1, reject_1) => {
    /**
     * Challenge Number 2!
     *
     * Similar to Challenge Number 1, except now you should assume that a LogSource
     * has only one method: popAsync() which returns a promise that resolves with a LogEntry,
     * or boolean false once the LogSource has ended.
     *
     * Your job is simple: print the sorted merge of all LogEntries across `n` LogSources.
     *
     * Call `printer.print(logEntry)` to print each entry of the merged output as they are ready.
     * This function will ensure that what you print is in fact in chronological order.
     * Call 'printer.done()' at the end to get a few stats on your solution!
     */
    const asyncLogSources = getLogSources(sourceCount);

    asyncSortedMerge(asyncLogSources, new Printer())
      .then(resolve_1)
      .catch(reject_1);
  });
};

runSolutions(100);
