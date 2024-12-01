# Use the official Node.js image (latest LTS version)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies, using legacy-peer-deps to prevent dependency issues
RUN npm install --legacy-peer-deps

# Add a step to check the installed packages (for debugging)
RUN npm ls

# Copy the rest of the application code into the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 3000 (or the port your app runs on)
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "start"]