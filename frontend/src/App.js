import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import "./App.css"

const App = () => {
  const [images, setImages] = useState([])
  const [hash, setHash] = useState(null)

  useEffect(() => {
    console.log("Fetching new images...")
    fetch('/uploads')
      .then(res => res.json())
      .then(data => {
        setImages(data)
        setHash(Date.now())
        console.log(data)
      })

    setInterval(() => {
      console.log("Fetching new images...")
      fetch('/uploads')
        .then(res => res.json())
        .then(data => {
          setImages(data)
          setHash(Date.now())
          console.log(data)
        })
    }, 20000)
  }, [])

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
