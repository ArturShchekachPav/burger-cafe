export function debounce(func: (...arg: unknown[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return (...arg: Parameters<typeof func>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...arg), delay);
  };
}
