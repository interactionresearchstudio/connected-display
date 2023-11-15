# Connected Display Frontend / Backend

This repository contains the backend for the Connected Studio connected display idea.

## API routes

`/upload/device-name` (POST)
Upload an image and tags it with the device name.

`/uploads` (GET)
Get list of images on the server.

`/uploads/filename.jpg` (GET)
Get a specific image.

`/uploads/device-name/latest` (GET)
Get the latest images from a device.

`/manualupload` (GET)
A manual way to upload an image to the server with an HTML form. 

`/devices` (GET)
Get list of devices on the server.

## Running the server locally

### Requirements
- Docker
- docker-compose

1. Run `docker-compose build`
2. Once the container is built, run `docker-compose up`.
3. The server should be running on port 80.

## Production
This repository is set up to deploy automatically to Heroku. It can be viewed [here](https://connected-display.herokuapp.com/).
