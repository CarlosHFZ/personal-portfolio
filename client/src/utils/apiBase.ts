// src/utils/apiBase.ts
const isProduction = import.meta.env.PROD;
const API_BASE = isProduction
  ? "/.netlify/functions/api"
  : "http://localhost:5000/api";

console.log('Environment:', import.meta.env.MODE);
console.log('Is Production:', isProduction);
console.log('API_BASE:', API_BASE);

export { API_BASE };
