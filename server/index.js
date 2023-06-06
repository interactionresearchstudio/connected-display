const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs')
const cors = require('cors')
const isImage = require('is-image')

app.use(cors({
    origin: '*'
}))

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
)

// Serve frontend
app.use(express.static(path.resolve(__dirname, './build')))
app.use('/manualupload', express.static(path.resolve(__dirname, './public/index.html')))

// Serve images
app.use('/uploads', express.static('./upload'))

// Serve list of images
app.get('/uploads', (req, res) => {
    fs.readdir(__dirname + '/upload', (err, files) => {
        if (err) {
            return res.sendStatus(500)
        }
        let images = []
        files.forEach(file => {
            if (isImage(file)) {
                images.push(file)
            }
        })
        return res.json(images)
    })
})

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