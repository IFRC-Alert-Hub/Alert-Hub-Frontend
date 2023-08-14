# FROM node:18 as builder
# # Set the working directory to /app inside the container
# WORKDIR /app
# # Copy app files
# COPY . .
# # Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
# RUN npm ci 
# # Build the app
# RUN npm run build

# # Bundle static assets with nginx
# FROM nginx:1.21.0 as production
# ENV NODE_ENV production
# # Copy built assets from `builder` image
# COPY --from=builder /app/build /usr/share/nginx/html
# # Add your nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# # Expose port
# EXPOSE 3000
# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]


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