export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

export function isRequired(value) {
  return String(value || "").trim().length > 0;
}
