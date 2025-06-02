const math = require("./mathFile");

test("adds 1 + 2 to equal 3", () => {
  expect(math.sum(1, 2)).toBe(3);
});

test("adds 4 + 7 to equal 28", () => {
  expect(math.multiply(4, 7)).toBe(28);
});

test("adds 4 - 7 to equal -3", () => {
  expect(math.substract(4, 7)).toBe(-3);
});
