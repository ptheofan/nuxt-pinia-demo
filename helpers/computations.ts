export function closestMatch(value: number, values: number[]) {
  return values.reduce(function(prev, curr) {
    return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
  });
}
