export function loop(times: number, operation: (index: number) => any): void {
  const t = Math.abs(Math.trunc(times));
  for (let i = 0; i < t; i++) {
    operation(i);
  }
}
