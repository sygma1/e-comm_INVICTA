# Use an appropriate Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the API Gateway port
EXPOSE 3000

# Command to run the API Gateway
CMD ["node", "index.js"]
