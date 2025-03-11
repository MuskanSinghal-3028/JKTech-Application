# Use official Node.js image
FROM node:22.14.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately (better caching)
COPY package*.json ./


RUN npm install 

# Now copy the rest of the app files (including src/ for the build)
COPY . .

# Build the application (creates the dist/ folder)
RUN npm run build

# Clean npm cache to reduce image size
RUN npm cache clean --force

# Expose the application port
EXPOSE 5600

# Start the app in production mode
CMD ["npm", "run", "start:prod"]
