# Base image
FROM node:18

# Set the environment variable for Node.js to development
ENV NODE_ENV development

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies defined in package.json
RUN npm i && npm cache clean --force

# Copy the remaining application files to the working directory
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "start"]

# Expose port 3000 to the outside world (if needed)
EXPOSE 3000