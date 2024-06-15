# Use the official Node.js image from Docker Hub, specifying a version for stability
FROM node:current-alpine3.20

# Update package list and install necessary packages
RUN apk update && apk add --no-cache dumb-init

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV SERVICE_NAME meetings_api

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies
RUN npm ci --only-production

# Create logs directory and set permissions
RUN mkdir -p /usr/src/app/logs && chown node:node /usr/src/app/logs

# Switch to the non-root user
USER node

# Copy application code and set ownership
COPY --chown=node:node ./src/ .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["dumb-init", "node", "app.js"]
