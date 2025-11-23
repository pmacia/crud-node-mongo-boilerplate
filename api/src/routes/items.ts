import express from 'express';
import mongojs from 'mongojs';

// Create a router instance
const router = express.Router();

// Database configuration
// We use the DB_URL environment variable injected by Docker Compose
// If not present, it falls back to a default local connection string (useful for local testing without Docker)
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/crud_db';

// Connect to the 'items' collection in the MongoDB database
const db = mongojs(dbUrl, ['items']);

// Handle database connection errors
db.on('error', (err) => {
    console.error('Database error:', err);
});

db.on('connect', () => {
    console.log('Connected to database at:', dbUrl);
});

/**
 * GET /items
 * Retrieves all items from the database.
 */
router.get('/items', (req, res) => {
    db.items.find((err, docs) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(docs);
        }
    });
});

/**
 * GET /items/:id
 * Retrieves a single item by its ID.
 */
router.get('/items/:id', (req, res) => {
    const id = req.params.id;

    // mongojs.ObjectId converts the string ID to a MongoDB ObjectId
    db.items.findOne({ _id: mongojs.ObjectId(id) }, (err, doc) => {
        if (err) {
            console.error('Error fetching item:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (!doc) {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.json(doc);
        }
    });
});

/**
 * POST /items
 * Creates a new item.
 * Expects a JSON body with the item details.
 */
router.post('/items', (req, res) => {
    const newItem = req.body;

    // Basic validation: ensure the body is not empty
    if (!newItem || Object.keys(newItem).length === 0) {
        return res.status(400).json({ error: 'Bad Request: Body cannot be empty' });
    }

    db.items.save(newItem, (err, doc) => {
        if (err) {
            console.error('Error saving item:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json(doc);
        }
    });
});

/**
 * PUT /items/:id
 * Updates an existing item by its ID.
 * Expects a JSON body with the fields to update.
 */
router.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'Bad Request: Body cannot be empty' });
    }

    // findAndModify is used to update the document
    db.items.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: updateData },
        new: true // Return the updated document
    }, (err, doc) => {
        if (err) {
            console.error('Error updating item:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (!doc) {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.json(doc);
        }
    });
});

/**
 * DELETE /items/:id
 * Deletes an item by its ID.
 */
router.delete('/items/:id', (req, res) => {
    const id = req.params.id;

    db.items.remove({ _id: mongojs.ObjectId(id) }, (err, result) => {
        if (err) {
            console.error('Error deleting item:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // result contains information about the operation (n: number of removed docs)
            // @ts-ignore - mongojs types might be slightly off for remove callback result
            if (result && result.n === 0) {
                res.status(404).json({ error: 'Item not found' });
            } else {
                res.json({ message: 'Item deleted successfully' });
            }
        }
    });
});

export default router;
