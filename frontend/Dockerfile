# Use an official Node.js LTS version as base image
FROM node:20-alpine as builder

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose the port your server runs on
EXPOSE 3000

# Build the application
RUN pnpm run build

# Run your server
CMD ["npm", "run", "dev"]




