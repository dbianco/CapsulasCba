class Validation {
  static isNullOrEmpty(str) {
    return str === null || str === undefined || str.trim() === "";
  }

  static containsScriptInjection(str) {
    if (Validation.isNullOrEmpty(str)) {
      return false;
    }
    const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i;
    return scriptRegex.test(str);
  }
}

export default Validation;
