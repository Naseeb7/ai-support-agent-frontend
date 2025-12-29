# AI Support Agent – Frontend

This repository contains the frontend for a minimal AI-powered customer support chat system.

The goal was not to build a visually impressive UI, but to build a frontend that:

- behaves predictably  
- reflects backend state accurately  
- fails gracefully under poor network or backend conditions  
- resembles a real internal support tool rather than a demo  

The frontend simulates how a live chat widget would interact with a production-ready AI support backend.

---

## What This Does

- Renders a simple live chat interface (user ↔ AI)  
- Sends user messages to the backend chat API  
- Maintains conversation continuity via `sessionId`  
- Fetches conversation history from the backend on reload  
- Surfaces backend and LLM failures as chat messages  
- Allows explicitly starting a new conversation  

> No authentication is included by design (see scope decisions below).

---

## Tech Stack

- React  
- Vite  
- TypeScript  
- Tailwind CSS (v4.x)  

The frontend is intentionally lightweight: no routing, no global state libraries, and no UI frameworks.

---

## Core Design Decisions (Important)

### 1. Backend as the single source of truth

The frontend does **not** persist messages locally.

All conversation history is fetched from the backend using `sessionId`.

This ensures:

- no duplicated or divergent state  
- consistent behavior across reloads  
- alignment with backend persistence guarantees  

The frontend acts as a renderer and orchestrator, not a datastore.

---

### 2. Explicit session handling

Conversation state is controlled entirely via `sessionId`.

- If a `sessionId` exists:
  - history is fetched from the backend
- If no `sessionId` exists:
  - the backend creates a new conversation on first message

A **New Chat** action explicitly clears the session and UI state, making conversation boundaries clear and intentional.

This mirrors the backend’s strict session handling rules.

---

### 3. Failure is rendered, not hidden

Backend failures (including LLM errors):

- do not crash the UI  
- do not block future messages  
- are rendered as AI error messages in the chat  

This mirrors the backend philosophy that **failure is data**, not an exception.

---

### 4. Logic centralized, UI kept dumb

All state, effects, and API calls live in `App.tsx`.

UI components are strictly presentational:

- no API calls  
- no storage access  
- no side effects  

This keeps behavior predictable and prevents logic from leaking into the view layer.

---

### 5. Minimal but intentional UI

The UI is deliberately restrained:

- neutral color palette  
- no animations  
- no theming system  
- no visual gimmicks  

The goal is clarity and correctness, not visual novelty.

---

## API Interaction (High Level)

The frontend interacts with the backend via:

- `POST /chat/message`  
- `GET /chat/history/:sessionId`  

The frontend trusts backend responses and does not attempt to infer or “repair” state.

---

## Environment Variables

```env
VITE_BACKEND_BASE_URL=http://localhost:3000
```

An example file is provided:

```env
.env.example
```

---

## Running Locally

```bash
npm install
npm run dev
```

The frontend expects the backend to be running and reachable at `VITE_BACKEND_BASE_URL`.

---

## Folder Structure (Relevant)

```
src/
 ├─ components/
 │   ├─ ChatHeader.tsx
 │   ├─ MessageList.tsx
 │   ├─ MessageBubble.tsx
 │   └─ ChatInput.tsx
 ├─ lib/
 │   ├─ api.ts
 │   └─ config.ts
 ├─ types/
 │   └─ chat.ts
 ├─ App.tsx
 └─ main.tsx
```

- `App.tsx` owns all state and side effects  
- Components are purely presentational  
- No component fetches data or manages persistence  

---

## Scope Decisions & Trade-offs

### Why no authentication?

Authentication was intentionally excluded.

This assignment focuses on:

- chat flow correctness  
- session handling  
- backend-driven state  
- robustness under failure  

The frontend structure allows user-based authentication to be added later without major refactors.

---

### Why no client-side message persistence?

Persisting messages in local storage would introduce a second source of truth.

Since the backend already persists conversations reliably, the frontend defers entirely to backend history.

---

### Why no streaming responses?

Streaming improves perceived latency but complicates state handling and error scenarios.

The frontend prioritizes:

- deterministic behavior  
- clean failure handling  
- simple, debuggable logic  

---

## If I Had More Time

- Streaming AI responses  
- Message timestamps in UI  
- Pagination for long histories  
- Accessibility improvements  
- Authenticated, user-scoped conversations  

All intentionally excluded to keep scope aligned with the assignment.

---

## Repositories

- **Backend (this repo)**  
  https://github.com/Naseeb7/ai-support-agent

- **Frontend**  
  this repo, Vite + Tailwind

---

## Live Demo

- Backend API: https://ai-support-agent-3uwt.onrender.com
- Frontend App: https://ai-support-agent-frontend.vercel.app/

---

## Final Note

This frontend is intentionally boring.

Its purpose is to:

- reflect backend truth accurately  
- avoid surprising behavior  
- degrade gracefully under failure  

It is designed to evolve safely, not impress visually.
