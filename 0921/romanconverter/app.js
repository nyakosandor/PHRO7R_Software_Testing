function convertToRoman(num) {
  return "I".repeat(num);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { convertToRoman };
}

if (typeof window !== "undefined") {
  window.convertToRoman = convertToRoman;
}
