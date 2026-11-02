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

QUnit.test("100 -> C, 400 -> CD, 500 -> D, 900 -> CM, 1000 -> M", (assert) => {
  assert.strictEqual(convertToRoman(100), "C");
  assert.strictEqual(convertToRoman(400), "CD");
  assert.strictEqual(convertToRoman(500), "D");
  assert.strictEqual(convertToRoman(900), "CM");
  assert.strictEqual(convertToRoman(1000), "M");
});

QUnit.test("A specifikáció példái", (assert) => {
  assert.strictEqual(convertToRoman(1), "I");
  assert.strictEqual(convertToRoman(4), "IV");
  assert.strictEqual(convertToRoman(9), "IX");
  assert.strictEqual(convertToRoman(14), "XIV");
  assert.strictEqual(convertToRoman(58), "LVIII");
  assert.strictEqual(convertToRoman(1994), "MCMXCIV");
  assert.strictEqual(convertToRoman(3999), "MMMCMXCIX");
});

QUnit.test("Határértékek és összetett számok", (assert) => {
  assert.strictEqual(convertToRoman(1), "I", "alsó határ");
  assert.strictEqual(convertToRoman(3999), "MMMCMXCIX", "felső határ");
  assert.strictEqual(convertToRoman(3888), "MMMDCCCLXXXVIII", "leghosszabb alak");
  assert.strictEqual(convertToRoman(444), "CDXLIV", "csupa kivonásos alak");
  assert.strictEqual(convertToRoman(2024), "MMXXIV");
});

QUnit.test("Tartományon kívüli egész számok -> RangeError", (assert) => {
  assert.throws(() => convertToRoman(0), RangeError, "0");
  assert.throws(() => convertToRoman(-1), RangeError, "-1");
  assert.throws(() => convertToRoman(-100), RangeError, "-100");
  assert.throws(() => convertToRoman(4000), RangeError, "4000");
});
