# Use Node.js 18 Alpine as the base image for a small footprint
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) first
# This leverages Docker's cache layer to avoid re-installing dependencies if only code changes
COPY package*.json ./

# Install dependencies
# In a production environment, you might use 'npm ci --only=production'
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
# Using 'npm run dev' for development with hot-reloading via nodemon
CMD ["npm", "run", "dev"]
