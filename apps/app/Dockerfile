FROM node:22-alpine AS build
WORKDIR /opt/app
COPY ./apps/app/package.json ./package.json
RUN npm i
COPY ./apps/app .
ARG env=prod
RUN BASE_URL=http://127.0.0.1:3001 npm run build


FROM nginx:1.29.8-alpine
COPY --from=build /opt/app/dist/ /usr/share/nginx/html
COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

