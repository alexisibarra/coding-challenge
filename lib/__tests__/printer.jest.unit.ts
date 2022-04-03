import Printer from "../printer";

describe("printer class", () => {
  describe("constructor", () => {
    const printer = new Printer();

    it("should set logsPrinted to 0", () => {
      expect(printer.logsPrinted).toBe(0);
    });

    it("should set last to 0", () => {
      expect(printer.last.getTime()).toBe(0);
    });
  });

  describe("print method", () => {
    const printer = new Printer();

    describe("when called with a valid log entry", () => {
      const now = new Date();

      printer.print({ date: now, msg: "test" });

      it("should increment logsPrinted", () => {
        expect(printer.logsPrinted).toBe(1);
      });

      it("should set last to the date of the log entry", () => {
        expect(printer.last).toBe(now);
      });
    });

    describe("when called with a past log entry", () => {
      const now = new Date();
      const pastdate = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5);

      expect(() => printer.print({ date: pastdate, msg: "test" })).toThrow(
        Error
      );
    });
  });

  describe("done method", () => {
    const now = new Date();

    const now_minus_5 = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5);
    const now_minus_4 = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 4);
    const now_minus_3 = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3);
    const now_minus_2 = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2);

    const printer = new Printer();

    printer.print({ date: now_minus_5, msg: "test" });
    printer.print({ date: now_minus_4, msg: "test" });
    printer.print({ date: now_minus_3, msg: "test" });
    printer.print({ date: now_minus_2, msg: "test" });

    expect(printer.logsPrinted).toBe(4);
  });
});
