export function debounce(func: (...arg: unknown[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return (...arg: Parameters<typeof func>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...arg), delay);
  };
}

export function checkResponse(res: Response): unknown {
  return res.ok
    ? res.json()
    : res.json().then((err) => {
        throw err;
      });
}

export function refreshToken(): Promise<Response> {
  const requestBody: { token: string } = { token: '' };
  const body: string = JSON.stringify(requestBody);

  return fetch('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}
