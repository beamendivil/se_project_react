import { checkResponse } from "./api";

// Use environment variable for API URL, fallback to backend dev port (3001)
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

// POST /signup - Register a new user
const register = ({ name, avatar, email, password }) =>
  fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);

// POST /signin - Authorize a user
const authorize = ({ email, password }) =>
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

// GET /users/me - Validate token
const checkToken = (token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

export { register, authorize, checkToken };
