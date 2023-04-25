# Connected Display Frontend / Backend

This repository contains the frontend and backend for the Connected Studio connected display idea.

## API routes

`/`
Currently the root provides a manual way to upload an image to the server with an HTML form. 
This will eventually be replaced with the React frontend that shows images uploaded.

`/upload` (POST)
Upload an image. Filenames that already exist on the file system will be overwritten.

`/uploads` (GET)
Get list of images on the server.

`/uploads/filename.jpg` (GET)
Get a specific image.

## Running the server locally

### Requirements
- Docker
- docker-compose

1. Navigate to `./server`
2. Run `docker-compose build`
3. Once the container is built, run `docker-compose up`.
3. The server should be running on port 80.

## Production
This repository is set up to deploy automatically to Heroku. It can be viewed [here](https://connected-display.herokuapp.com/).