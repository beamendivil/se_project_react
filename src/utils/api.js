// Use environment variable for API URL, fallback to backend dev port (3001)
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Check response and return parsed JSON or throw error
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Error: ${res.status}`));
};

// GET /items - Fetch all clothing items
const getItems = () => fetch(`${baseUrl}/items`).then(checkResponse);

// POST /items - Add a new clothing item
const addItem = ({ name, imageUrl, weather }, token) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);

// DELETE /items/:id - Remove a clothing item
const deleteItem = (id, token) =>
  fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

// PATCH /users/me - Update user profile
const updateUserProfile = ({ name, avatar }, token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);

// PUT /items/:id/likes - Like an item
const addCardLike = (id, token) =>
  fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

// DELETE /items/:id/likes - Unlike an item
const removeCardLike = (id, token) =>
  fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

export {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
  checkResponse,
};
