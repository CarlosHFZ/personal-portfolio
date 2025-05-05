// src/utils/apiBase.ts
export const API_BASE =
  import.meta.env.PROD
    ? "/.netlify/functions/api"
    : "http://localhost:5000/api";
