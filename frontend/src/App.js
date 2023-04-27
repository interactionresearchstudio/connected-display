import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import "./App.css"

const App = () => {
  const [images, setImages] = useState([])
  const [hash, setHash] = useState(null)

  useEffect(() => {
    fetchImages()

    setInterval(() => {
      fetchImages()
    }, 20000)
  }, [])

  const fetchImages = () => {
    console.log("Fetching new images...")
    fetch('/uploads')
      .then(res => res.json())
      .then(data => {
        let files = []
        data.map((f) => {
          if (f.startsWith("display")) {
            files.push(f)
          }
        })
        setImages(files)
        setHash(Date.now())
        console.log(files)
      })
  }

  return (
    <Container fluid id="main-container">
      {images.map((image, index) => {
        return (
          <img key={index} src={`/uploads/${image}?${hash}`} alt=""/>
        )
      })}
    </Container>
  )
}

export default App;
