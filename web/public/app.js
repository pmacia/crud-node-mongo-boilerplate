// API Endpoint URL
// Assumes the API is running on localhost:3000
const API_URL = 'http://localhost:3000/api/items';

// DOM Elements
const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const itemList = document.getElementById('itemList');

/**
 * Fetches all items from the API and renders them.
 */
async function fetchItems() {
    try {
        const response = await fetch(API_URL);
        const items = await response.json();
        renderItems(items);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

/**
 * Renders the list of items to the DOM.
 * @param {Array} items - Array of item objects
 */
/**
 * Renders the list of items to the DOM.
 * @param {Array} items - Array of item objects
 */
function renderItems(items) {
    itemList.innerHTML = ''; // Clear current list
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <div>
                <button class="delete-btn" data-id="${item._id}">Delete</button>
            </div>
        `;
        itemList.appendChild(li);
    });
}

/**
 * Handle clicks on the item list (Event Delegation)
 */
itemList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        if (id) {
            await deleteItem(id);
        }
    }
});

/**
 * Adds a new item via the API.
 * @param {Event} e - Form submit event
 */
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = itemInput.value;

    if (!name) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            itemInput.value = ''; // Clear input
            fetchItems(); // Refresh list
        }
    } catch (error) {
        console.error('Error adding item:', error);
    }
});

/**
 * Deletes an item via the API.
 * @param {string} id - The ID of the item to delete
 */
async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchItems(); // Refresh list
        }
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

// Initial fetch on page load
fetchItems();
