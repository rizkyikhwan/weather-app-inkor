export function checkIfOnlySpaces(input) {
  const regex = /^\s*$/;
  return regex.test(input);
}
