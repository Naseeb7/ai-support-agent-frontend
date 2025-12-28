const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

if (!BACKEND_BASE_URL || BACKEND_BASE_URL.trim() === '') {
  throw new Error('VITE_BACKEND_BASE_URL is not defined or is empty');
}

export { BACKEND_BASE_URL };