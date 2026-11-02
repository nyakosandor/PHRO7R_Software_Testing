const ROMAN_NUMERALS = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];

const MIN_VALUE = 1;
const MAX_VALUE = 3999;

function validateInput(num) {
  if (!Number.isInteger(num)) {
    throw new TypeError("A bemenetnek egész számnak kell lennie: " + num);
  }
  if (num < MIN_VALUE || num > MAX_VALUE) {
    throw new RangeError("A szám " + MIN_VALUE + " és " + MAX_VALUE + " között lehet: " + num);
  }
}

function convertToRoman(num) {
  validateInput(num);

  let result = "";
  for (const { value, symbol } of ROMAN_NUMERALS) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { convertToRoman };
}

if (typeof window !== "undefined") {
  window.convertToRoman = convertToRoman;
}
