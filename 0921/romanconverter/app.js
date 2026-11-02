function convertToRoman(num) {
  return "I";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { convertToRoman };
}

if (typeof window !== "undefined") {
  window.convertToRoman = convertToRoman;
}
