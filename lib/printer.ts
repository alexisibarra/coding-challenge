import * as _ from "lodash";

import { ILogEntry } from "./log-source";

class Printer {
  startTime: Date;

  last: Date;

  logsPrinted: number;

  constructor() {
    this.last = new Date(0);
    this.logsPrinted = 0;
  }

  print(log: ILogEntry) {
    if (!_.isDate(log.date)) {
      throw new Error(`${log.date} is not a date`);
    }
    if (log.date >= this.last) {
      console.log(log.date, log.msg);
    } else {
      throw new Error(`${log.date} is not greater than ${this.last}`);
    }
    this.last = log.date;
    this.logsPrinted += 1;
    if (this.logsPrinted === 1) {
      this.startTime = new Date();
    }
  }

  done() {
    const now = new Date();
    const timeTaken = (now.getTime() - this.startTime.getTime()) / 1000;

    console.log("\n***********************************");
    console.log("Logs printed:\t\t", this.logsPrinted);
    console.log("Time taken (s):\t\t", timeTaken);
    console.log("Logs/s:\t\t\t", this.logsPrinted / timeTaken);
    console.log("***********************************\n");
  }
}

export default Printer;
