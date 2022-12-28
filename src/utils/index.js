export function capitalize(str) {
  try {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  } catch (error) {
    return str;
  }
}
