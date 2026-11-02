function convertToRoman(num) {
  let result = "";
  if (num >= 5) {
    result += "V";
    num -= 5;
  }
  return result + "I".repeat(num);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { convertToRoman };
}

if (typeof window !== "undefined") {
  window.convertToRoman = convertToRoman;
}
