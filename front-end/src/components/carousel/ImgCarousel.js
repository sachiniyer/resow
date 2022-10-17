import Carousel from 'react-bootstrap/Carousel';
import * as React from 'react';
import './ImgCarousel.css'

function ImgCarousel(props) {
    
    const imgList = [
        "./logo.svg",
        "./sample.png",
        "./sample2.png",
        "./logo192.png",
    ]
  return (
    <Carousel width={400} height={400} border={"solid"}>

        {imgList.map((url) => {
            return (
                <Carousel.Item>
                    <img 
                      src = {url} 
                      width={350}
                      height={350}
                    />
                </Carousel.Item>
            )
        })}
      
    </Carousel>
  );
}

export default ImgCarousel;