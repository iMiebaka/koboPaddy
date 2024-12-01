# Use an official Node.js runtime as a parent image
FROM node:20.12.1 as build

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --production

COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
