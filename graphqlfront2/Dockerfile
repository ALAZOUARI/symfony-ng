FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/graphqlfront2 /usr/share/nginx/html