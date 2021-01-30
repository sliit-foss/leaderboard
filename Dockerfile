FROM node:10-alpine as build-stage

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn

COPY ./*.* /app/
COPY ./public /app/public
COPY ./src /app/src

ARG TAG_NAME
ARG SHORT_SHA
ENV REACT_APP_TAG_NAME=$TAG_NAME
ENV REACT_APP_SHORT_SHA=$SHORT_SHA
RUN printf "REACT_APP_TIMESTAMP=$(date +"%s")000" > /app/.env
RUN yarn build

FROM nginx:1.13.12-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/build/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;" ]
