# Use the official Node.js image.
FROM node:14

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json files.
COPY package.json ./

# Install dependencies.
RUN npm install

RUN ls -al /app

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN npm run build --verbose

# Expose the port that the app runs on.
EXPOSE 3000

# Start the app.
CMD ["npm", "start"]
