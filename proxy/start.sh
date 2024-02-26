#!/bin/sh

nginx -g "daemon off;" &

inotifywait --monitor --recursive --event close_write,create,moved_to /etc/letsencrypt/live/ |
  while read directory action file; do
    if [[ $file = "fullchain.cer" ]]; then
      echo "SSL certificates updated; reloading Nginx configuration"
      nginx -s reload
    fi
  done