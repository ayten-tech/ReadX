# Use Node.js 18 as the base image
FROM node:18-alpine

# Set working directory
#What it does: All next commands will run inside /app in the container.
#Why it's used: Organizes your code inside the container.
WORKDIR /usr/src/app

# Copy package files (package.json and package-lock.json) first.
COPY package*.json ./

# Install dependencies (including dev dependencies for TypeScript and migration tools (ts-node, TypeORM))
RUN npm install

# Copy source code (brings in your NestJS app files)
COPY . .

# Build the application (compiles TypeScript to JavaScript)
RUN npm run build

# Install ts-node (and tsconfig-paths) globally so that the migration CLI can run .ts files (migration files are ts)
RUN npm install -g ts-node tsconfig-paths

# # Run the migration (using npm run typeorm:migration:run) so that the migration file (ts) is executed inside the container
# RUN npm run typeorm:migration:run

# Expose the port the app runs on (informs Docker that the app listens on port 3001)
EXPOSE 3001

# Command to run the application (starts the built NestJS app (main.js) in production mode)
CMD ["npm", "run", "start:prod"] 