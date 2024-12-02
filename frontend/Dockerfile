# Use an official Node.js runtime as a parent image
FROM node:20.12.1 as build

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn add typescript --dev


RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
