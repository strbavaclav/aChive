# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# install prettier for executing
RUN yarn global add prettier

# Copy package.json and package-lock.json to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the source code to the container
COPY . .

# Use arguments passed at build-time
ARG PORT
ARG MONGODB_URI
ARG ACCESS_JWT_SECRET
ARG REFRESH_JWT_SECRET

# Set environment variables from arguments
ENV PORT=${PORT}
ENV MONGODB_URI=${MONGODB_URI}
ENV ACCESS_JWT_SECRET=${ACCESS_JWT_SECRET}
ENV REFRESH_JWT_SECRET=${REFRESH_JWT_SECRET}

# Build TypeScript code
RUN yarn compile

# Generate types for graphql
RUN yarn graphql

# Build dist
RUN yarn build

# Expose the port your app runs on
EXPOSE 4000

# Command to run your application
CMD ["yarn", "start"]