import * as _ from "lodash";
import P = require("bluebird");

import Faker = require("Faker");

export interface ILogEntry {
  date: Date;
  msg: string;
}

/*
    We don't like OOP - in fact - we despise it!

    However, most real world implementations of something like a log source
    will be in OO form - therefore - we simulate that interaction here.
*/

class LogSource {
  drained: boolean;

  last: ILogEntry;

  count: number;

  constructor() {
    this.drained = false;
    this.last = {
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * _.random(40, 60)),
      msg: Faker.Company.catchPhrase(),
    };
    this.count = 1;
  }

  getNextPseudoRandomEntry() {
    return {
      date: new Date(
        this.last.date.getTime() +
          1000 * 60 * 60 * _.random(10) +
          _.random(1000 * 60)
      ),
      msg: Faker.Company.catchPhrase(),
    };
  }

  pop() {
    this.last = this.getNextPseudoRandomEntry();

    if (this.last.date > new Date()) {
      this.drained = true;
    }

    if (!this.drained) {
      this.count += 1;
    }

    return this.drained ? false : this.last;
  }

  popAsync() {
    this.last = this.getNextPseudoRandomEntry();

    if (this.last.date.getTime() > Date.now()) {
      this.drained = true;
    }

    return P.delay(_.random(8)).then(() => (this.drained ? false : this.last));
  }
}

export default LogSource;
