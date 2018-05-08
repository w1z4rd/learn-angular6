FROM nginx:1.13.12-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html

EXPOSE 80

