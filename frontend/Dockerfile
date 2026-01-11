# 1️⃣ Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# 2️⃣ Runtime stage (NGINX)
FROM nginx:alpine

# Copy built frontend
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx proxy config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
