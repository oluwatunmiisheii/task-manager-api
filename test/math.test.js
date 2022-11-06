const math = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => num1 / num2
}

test('hello world' , () => {
  expect(math.add(1, 2)).toBe(3);
});