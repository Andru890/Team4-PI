# Use an official Node.js LTS version as base image
FROM node:lts-alpine as builder

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /frontend

# Copy the package.json and package-lock.json
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm run build

# Use a lightweight Node.js LTS image as final base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /frontend

# Copy the built files from the previous stage
COPY --from=builder /frontend/dist ./dist

# Expose the port your server runs on
EXPOSE 3000

# Run your server
CMD ["npm", "start"]
