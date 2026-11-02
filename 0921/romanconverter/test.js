if (typeof require !== "undefined") {
  var { convertToRoman } = require("./app.js");
}

QUnit.module("convertToRoman");

QUnit.test("1 -> I", (assert) => {
  assert.strictEqual(convertToRoman(1), "I");
});
