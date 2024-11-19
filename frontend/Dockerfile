# Use the official Node.js LTS image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Use a lightweight web server to serve static files in production
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
