function convertToRoman(num) {
  let result = "";
  if (num >= 10) {
    result += "X";
    num -= 10;
  }
  if (num === 9) {
    result += "IX";
    num -= 9;
  }
  if (num >= 5) {
    result += "V";
    num -= 5;
  }
  if (num === 4) {
    result += "IV";
    num -= 4;
  }
  return result + "I".repeat(num);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { convertToRoman };
}

if (typeof window !== "undefined") {
  window.convertToRoman = convertToRoman;
}
