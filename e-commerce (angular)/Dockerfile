# # Stage 1: Build Angular application
# FROM node:21-alpine AS builder

# # Set the working directory
# WORKDIR /app

# # Copy dependency definitions
# COPY package.json package-lock.json ./

# # Install npm globally (optional)
# RUN npm install -g npm@latest

# # Install dependencies
# RUN npm install

# # Copy the application code
# COPY . .

# # Build the Angular application
# RUN npm run build --prod

# # Stage 2: Serve Angular application with Nginx
# FROM nginx:alpine

# # Copy the built Angular app from the builder stage to Nginx directory
# COPY --from=builder /app/dist/* /usr/share/nginx/html/

# # Expose the port the app runs in
# EXPOSE 4200

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


# FROM node:16-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# EXPOSE 4200
# CMD ["npm", "start"]


# # Stage 1: Build Angular application
# FROM node:18-alpine AS build

# # Set the working directory
# WORKDIR /app


# COPY package.json /app/
# RUN npm install -g npm@9.5.1

# # Copy the rest of the application code
# COPY . .

# # Build the Angular application
# RUN npm run build

# # Stage 2: Serve Angular application with Node.js
# FROM node:18-alpine

# # Set the working directory
# WORKDIR /app

# # Copy built Angular app from the build stage to the current directory
# COPY --from=build /app/dist ./dist

# # Expose the port the app runs on
# EXPOSE 8010

# # Command to start the application
# CMD ["npm", "start"]





# # Stage 1: Build Angular application
# FROM node:18-alpine AS build

# RUN mkdir -p /app
# WORKDIR /app


# COPY package.json /app/
# RUN npm install -g npm@9.5.1

# # Install Angular CLI globally
# RUN npm install -g @angular/cli

# COPY . /app/
# RUN npm run build --prod

# # Stage 2: Serve Angular application with Nginx
# FROM nginx:alpine

# # Copy built files from the previous stage to Nginx directory
# COPY --from=build /app/dist/e-commerce /usr/share/nginx/html










#----------------------------------------------------

FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm ci

RUN npm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production
FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/e-commerce/browser /usr/share/nginx/html

EXPOSE 80