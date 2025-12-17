import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'

function Slideshow(props) {
  const [index, setIndex] = useState(0)
  const { images, type, interval } = props
  // type 1 auto自動
  // type 2 text圖片有文字
  // type 3 bot點點的
  // type 4 onClick自己按
  useEffect(() => {
    if (type === 1) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [type, images.length, interval])

  const nextSlide = () => setIndex(prev => (prev + 1) % images.length);
  const prevSlide = () => setIndex(prev => (prev - 1 + images.length) % images.length);
  const assignSlide = () => setIndex(assign => console.log(assign))

  return (
    <div className="w3-content w3-display-container" style={{ maxWidth: "600px" }}>
      {images.map((d, i) => (
        <img
          key={i}
          src={d.src}
          alt={`slide-${i}`}
          className={`w3-animate-opacity ${i === index ? "w3-show" : "w3-hide"}`}
          style={{ width: "100%", borderRadius: 8 }}
        />
      ))}

      {type === 2 && (
        <>
          <button className="w3-button w3-black w3-display-left" onClick={prevSlide}> &#10094; </button>
          <button className="w3-button w3-black w3-display-right" onClick={nextSlide}> &#10095;</button>
        </>
      )}

      {type === 3 && (
        <div className="w3-center w3-container w3-section">
          {images.map((dd, ii) => (
            <span className="w3-display-bottommiddle w3-black" key={ii} onClick={assignSlide}></span>
          ))}
        </div>
      )}
    </div >
  )
}

Slideshow.defaultProps = {
  type: 1,
  interval: 1000 * 60,
}

export default Slideshow