FROM alpine:3.15.4

ARG WEBMASTER_EMAIL

RUN apk add curl openssl
RUN curl https://get.acme.sh | sh -s email=$WEBMASTER_EMAIL

COPY ./crontab /tmp/crontab
RUN cat /tmp/crontab | crontab -
RUN rm /tmp/crontab

CMD crond -f -l 2