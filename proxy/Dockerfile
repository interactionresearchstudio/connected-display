FROM nginx:1.22.0-alpine

RUN apk add inotify-tools

COPY ./mime.types /etc/nginx/mime.types
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./start.sh /start.sh

CMD /start.sh