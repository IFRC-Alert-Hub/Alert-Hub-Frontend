# Use a specific version of Node.js as the base image
FROM node:14

# Set the environment variable for Node.js to production
ENV NODE_ENV production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies defined in package.json
RUN npm install && npm cache clean --force

# Copy the rest of the application files to the working directory
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "start"]

# Expose the necessary port (if your application uses a different port, change it)
EXPOSE 3000
