import Carousel from 'react-material-ui-carousel';
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/material/Box';

function ImgCarousel(props) {

  return (

    <Carousel animation="slide">
      {
        props.imgList && props.imgList.map((item, i) =>

          <Box key={i} sx={{ width: 1, zIndex: -1 }}>

            <AspectRatio objectFit="cover" ratio="1/1">
              <img src={item} alt={"resource"} />
            </AspectRatio>

          </Box>
        )
      }
    </Carousel>

  );
}

export default ImgCarousel;
