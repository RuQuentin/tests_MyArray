import MyArr from "./index";

describe("Class MyArray", () => {
  describe("tests for method FROM", () => {
    test("Class has static method FROM", () => {
      expect(MyArr.from).toBeInstanceOf(Function);
    });

    test("Instance has not Own Property FROM", () => {
      const arr = new MyArr(1, 4, 0);
      expect(arr.hasOwnProperty("from")).toBeFalsy();
    });

    test("If custom context is provided, use its context", () => {
      const objectAside = Object.create({ 0: 2 });
      const arr = MyArr.from(
        [10, 20, 30],
        function(x) {
          return x + this[0];
        },
        objectAside
      );
      expect(String(arr)).toBe("12,22,32");
    });

    test("Method FROM must return new instance of MyArr of current elements", () => {
      const arr = MyArr.from([10, 20, 30]);
      expect(arr).toBeInstanceOf(MyArr);
    });

    test("Method FROM can include 1, 2 or 3 arguments", () => {
      const arr1 = MyArr.from([10, 20, 30]);

      const arr2 = MyArr.from([10, 20, 30], function(x) {
        return x + 1;
      });

      const objectAside = { 0: 2 };
      const arr3 = MyArr.from(
        [10, 20, 30],
        function(x) {
          return this[0] + 1;
        },
        objectAside
      );

      expect(String(arr1)).toBe("10,20,30");
      expect(String(arr2)).toBe("11,21,31");
      expect(String(arr3)).toBe("3,3,3");
    });

    test("Elements' order in 'a' should be the same as in arrayLike", () => {
      const arr = [1, 2, 3];
      const arr1 = Array.from(arr);

      expect(String(arr) === String(arr1)).toBeTruthy();
    });
  });
});
