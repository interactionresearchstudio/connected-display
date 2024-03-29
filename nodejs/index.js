const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs')
const cors = require('cors')
const isImage = require('is-image')
const sharp = require('sharp')

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

// Serve image upload form
app.use('/manualupload', express.static(path.resolve(__dirname, './public/index.html')))

// Serve images
app.use('/uploads', express.static('./uploads'))

// Serve list of images
app.get('/uploads', (req, res) => {
    fs.readdir(__dirname + '/uploads', (err, files) => {
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

app.get('/devices', (req, res) => {
    fs.readdir(__dirname + '/uploads', (err, files) => {
        if (err) {
            return res.sendStatus(500)
        }
        let devices = []
        files.forEach(file => {
            if (isImage(file)) {
                //images.push(file)
                // Get substring of image
                // If substring not in list, add to list
                const deviceName = file.substring(0, file.indexOf('-T'))
                if (deviceName) {
                    if (!devices.includes(deviceName)) {
                        devices.push(deviceName)
                    }
                }
            }
        })
        return res.json(devices)
    })
})

// Serve latest image from device
app.get('/uploads/:deviceName/latest', (req, res) => {
    fs.readdir(__dirname + '/uploads', (err, files) => {
        if (err) {
            return res.sendStatus(500)
        }
        // Find images for this device
        let deviceImages = files.filter((file) => file.substring(0, file.indexOf('-T')) === req.params.deviceName)

        // Sort by timestamp
        deviceImages.sort((a, b) => {
            const ap = a.split('-T').pop()
            const bp = b.split('-T').pop()
            return (parseInt(ap) > parseInt(bp) ? -1 : 1)
        })

        console.log(deviceImages);

        // Redirect to latest image
        if (deviceImages.length > 0) {
            res.redirect(`/uploads/${deviceImages[0]}`)
        } else {
            res.sendStatus(404)
        }
    })
})

// Serve latest image from device
app.get('/uploads/:deviceName', (req, res) => {
    fs.readdir(__dirname + '/uploads', (err, files) => {
        if (err) {
            return res.sendStatus(500)
        }
        // Find images for this device
        let deviceImages = files.filter((file) => file.substring(0, file.indexOf('-T')) === req.params.deviceName)

        // Sort by timestamp
        deviceImages.sort((a, b) => {
            const ap = a.split('-T').pop()
            const bp = b.split('-T').pop()
            return (parseInt(ap) > parseInt(bp) ? -1 : 1)
        })

        console.log(deviceImages);

        // Redirect to latest image
        if (deviceImages.length > 0) {
            return res.json(deviceImages)
        } else {
            res.sendStatus(404)
        }
    })
})

// Upload route
app.post('/upload/:deviceName', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files
    
    console.log(image)
    
    console.log(`Device name: ${req.params.deviceName}`)

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

    const filename = `${__dirname}/uploads/${req.params.deviceName}-T${Date.now()}.jpg`

    // Move the uploaded image to our upload folder
    image.mv(filename, (err) => {
        if (!err) {
            sharp(filename)
            .rotate(-90)
            .withMetadata()
            .toBuffer(function(err, buffer) {
                if(err) throw err
                fs.writeFile(filename, buffer, function() {
                    return res.sendStatus(200)
                });
            })
        }
    })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})