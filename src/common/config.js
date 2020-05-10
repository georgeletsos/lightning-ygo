export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://lightning-ygo-api.herokuapp.com"
    : "http://localhost:3000";
