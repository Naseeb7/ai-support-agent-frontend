import { BACKEND_BASE_URL } from './config';

async function postJson(path: string, body: unknown) {
  const response = await fetch(BACKEND_BASE_URL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export { postJson };