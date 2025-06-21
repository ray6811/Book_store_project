# Use an official Node.js runtime as the build environment
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source
COPY . .

# Build the React application for production
RUN npm run build

# Use an official Nginx image to serve the built app
FROM nginx:alpine

# Copy the React build from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration if you have one (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
