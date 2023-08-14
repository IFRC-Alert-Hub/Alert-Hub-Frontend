# Use a Node 16 base image
FROM node:16-alpine 

# Set the working directory to /app inside the container
WORKDIR /app

# Copy application files into the container
COPY . .

# Install dependencies (npm ci ensures exact versions from lockfile are installed)
RUN npm ci 

# Build the application
RUN npm run build

# Set the environment to "production"
ENV NODE_ENV=production

# Expose the port on which the application will run (3000 is the default that `serve` uses)
EXPOSE 3000

# Start the application using the `serve` command
CMD [ "npx", "serve", "build" ]