import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import itemsRouter from './routes/items';

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();

// Define the port to listen on
// Uses the PORT environment variable or defaults to 3000
const port = process.env.PORT || 3000;

// Middleware Configuration

// Enable Cross-Origin Resource Sharing (CORS)
// This allows the frontend (running on a different port) to access the API
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Routes

// Mount the items router at /api
// All routes defined in itemsRouter will be prefixed with /api
// Example: /api/items
app.use('/api', itemsRouter);

// Root endpoint for health check
app.get('/', (req, res) => {
    res.send('API is running');
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
