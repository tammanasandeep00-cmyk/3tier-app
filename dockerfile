# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose your app port (change if needed)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
