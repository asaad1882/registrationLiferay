# build environment
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build --mode=production

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:1.21.6-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
