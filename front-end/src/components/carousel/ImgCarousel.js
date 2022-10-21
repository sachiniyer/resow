import Carousel from 'react-material-ui-carousel'
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/material/Box';


function ImgCarousel(props) {
    
    const imgList = [
        "./logo.svg",
        "./sample.png",
        "./sample2.png",
        "./logo192.png",
    ]
  return (
   
      <Carousel>
        {
            imgList.map( (item, i) => 
            
            <Box sx={{width:1}}>
              <AspectRatio objectFit="cover" ratio="1/1">
                <img src = {item}/> 
              </AspectRatio>
            </Box>
            
            )
        }
      </Carousel> 
  );
}

export default ImgCarousel;