if (typeof require !== "undefined") {
  var { convertToRoman } = require("./app.js");
}

QUnit.module("convertToRoman");

QUnit.test("1 -> I", (assert) => {
  assert.strictEqual(convertToRoman(1), "I");
});

QUnit.test("2 és 3 -> az I ismétlése", (assert) => {
  assert.strictEqual(convertToRoman(2), "II");
  assert.strictEqual(convertToRoman(3), "III");
});

QUnit.test("5 -> V, 6 -> VI, 8 -> VIII", (assert) => {
  assert.strictEqual(convertToRoman(5), "V");
  assert.strictEqual(convertToRoman(6), "VI");
  assert.strictEqual(convertToRoman(8), "VIII");
});

QUnit.test("4 -> IV (kivonásos alak)", (assert) => {
  assert.strictEqual(convertToRoman(4), "IV");
});
