# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /front-app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Use the official Nginx image to serve the static files
FROM nginx:alpine

# Copy the built React app from the previous stage to the Nginx HTML directory
COPY --from=0 /app/build /usr/share/nginx/html



# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
