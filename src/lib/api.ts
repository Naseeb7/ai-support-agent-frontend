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

async function getChatHistory(sessionId: string) {
  const response = await fetch(BACKEND_BASE_URL + `/chat/history/${sessionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

async function sendChatMessage(message: string, sessionId?: string) {
  const body: { message: string; sessionId?: string } = { message };
  if (sessionId) {
    body.sessionId = sessionId;
  }
  return await postJson("/chat/message", body);
}

export { postJson, sendChatMessage, getChatHistory };