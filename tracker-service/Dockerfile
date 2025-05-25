# Use Node.js 18 as the base image
FROM node:18-alpine

# Set working directory
#What it does: All next commands will run inside /app in the container.
#Why it's used: Organizes your code inside the container.
WORKDIR /usr/src/app

# Copy package files
# Copies only package.json and package-lock.json first.

COPY package*.json ./

# Install dependencies
# Installs only production dependencies.
RUN npm install

# Copy source code
#What it does: Copies all your source code to the container.
#Why it's used: Brings in your NestJS app files.
COPY . .

# Build the application
# This compiles TypeScript to JavaScript
RUN npm run build

# Expose the port the app runs on
#What it does: Informs Docker that the app listens on port 3002.
# Why it's used: Helps with container networking and port mapping.
EXPOSE 3002

# Command to run the application
# What it does: Starts the built NestJS app (main.js) in production mode.
# Why it's used: Defines the default command when the container starts.
CMD ["npm", "run", "start:prod"] 