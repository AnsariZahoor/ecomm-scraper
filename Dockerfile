# React Frontend Dockerfile
FROM node:21-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code and build it
COPY . .
RUN npm run build

# Serve the app with nginx
FROM nginx:stable-alpine

ARG REACT_APP_API_URL
ARG REACT_APP_API_KEY

ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_API_KEY=${REACT_APP_API_KEY}

COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
