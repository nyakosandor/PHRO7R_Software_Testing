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
