# Use Nginx Alpine for a lightweight web server
FROM nginx:alpine

# Copy static files to Nginx's default public directory
COPY public /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
