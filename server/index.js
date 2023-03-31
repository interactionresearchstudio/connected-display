const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
)

// Serve frontend
app.use(express.static('./public'))

// Serve images
app.use('/uploads', express.static('./upload'))

// Upload route
app.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files
    
    console.log(image)

    // If no image submitted, exit
    if (!image) {
        console.log("Error: No image submitted.")
        return res.sendStatus(400)
    }

    // If does not have image mime type prevent from uploading
    if (image.mimetype.indexOf("image") === -1) {
        console.log(`Error: Not an image. Mime type: ${image.mimetype}`)
        return res.sendStatus(400)
    }

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name)

    // All good
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})