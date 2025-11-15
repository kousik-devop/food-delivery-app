import axios from 'axios';

// Use a relative baseURL so Vite's dev proxy forwards `/api` to the backend.
// This keeps requests same-origin in development and avoids cross-site cookie issues.
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export default axios;
