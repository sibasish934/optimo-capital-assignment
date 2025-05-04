# Use an official Python runtime as a parent image
FROM node:22-alpine 

# Set the working directory in the container to /app
WORKDIR /app

# Copying the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
# Using --legacy-peer-deps to avoid peer dependency issues
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
# Using npm run dev to start the development server
CMD ["npm", "run", "dev"]


