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

QUnit.test("9 -> IX, 10 -> X", (assert) => {
  assert.strictEqual(convertToRoman(9), "IX");
  assert.strictEqual(convertToRoman(10), "X");
});

QUnit.test("14 -> XIV, 20 -> XX, 39 -> XXXIX (X ismétlése)", (assert) => {
  assert.strictEqual(convertToRoman(14), "XIV");
  assert.strictEqual(convertToRoman(20), "XX");
  assert.strictEqual(convertToRoman(39), "XXXIX");
});

QUnit.test("40 -> XL, 50 -> L, 58 -> LVIII, 90 -> XC, 99 -> XCIX", (assert) => {
  assert.strictEqual(convertToRoman(40), "XL");
  assert.strictEqual(convertToRoman(50), "L");
  assert.strictEqual(convertToRoman(58), "LVIII");
  assert.strictEqual(convertToRoman(90), "XC");
  assert.strictEqual(convertToRoman(99), "XCIX");
});
