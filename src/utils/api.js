const baseUrl = "http://localhost:3001";

// Check response and return parsed JSON or throw error
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// GET /items - Fetch all clothing items
const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

// POST /items - Add a new clothing item
const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);
};

// DELETE /items/:id - Remove a clothing item
const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};

export { getItems, addItem, deleteItem, checkResponse };
