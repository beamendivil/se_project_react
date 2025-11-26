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
  // Find item by _id query parameter since json-server 1.0 doesn't support custom ID field
  return fetch(`${baseUrl}/items?_id=${id}`, {
    method: "GET",
  })
    .then(checkResponse)
    .then((items) => {
      if (items && items.length > 0) {
        // Use the auto-generated id field for deletion
        const item = items[0];
        return fetch(`${baseUrl}/items/${item.id}`, {
          method: "DELETE",
        }).then(checkResponse);
      }
      return Promise.reject("Item not found");
    });
};

export { getItems, addItem, deleteItem, checkResponse };
