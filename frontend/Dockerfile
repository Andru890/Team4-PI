# Use an official Node.js LTS version as base image
FROM node:lts-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Use a lightweight Node.js LTS image as final base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=builder /app/dist ./dist

# Expose the port your server runs on
EXPOSE 3000

# Run your server
CMD ["npm", "start"]
