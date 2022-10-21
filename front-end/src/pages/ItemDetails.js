import * as React from 'react';
import ImgCarousel from '../components/carousel/ImgCarousel';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AspectRatio from '@mui/joy/AspectRatio';



export default function ItemDetails(props){
    return(
        <>
        <Box sx={{width:{xs:0.9,sm:0.5,md: 0.3}, paddingTop:1}}>
            <ImgCarousel/>
        </Box>
        <Box sx={{width:{xs:0.9,sm:0.5,md: 0.3}, display: 'flex'}}>
            <Box sx={{width:0.3,height:1,textAlign:"center",justifyContent:"center"}}>
                <AspectRatio ratio="1/1"> 
                 <Avatar sx={{border:"solid",justifyContent:"center",width: 0.5}} alt="thumbnail" src={props.profileURL}/> 
                </AspectRatio>
                <Box sx={{width:1, wordWrap: "break-word",fontSize: "10px"}}>
                     {props.sellerName}
                </Box>
            </Box>
            <Box sx={{width:0.05}}></Box>
            <Box>
                <Box sx={{height:0.1}}></Box>
                <Box sx={{height:0.4,wordWrap: "break-word",fontSize: {xs:"18px",sm:"20px",md: "20px"}, textAlign:"left"}}>
                    {props.title}
                </Box>
                <Box sx={{height:0.2}}></Box>
                <Box sx={{height:0.3, wordWrap: "break-word", fontSize: "15px", textAlign:"left", color:"#2596be"}}>
                    {props.location}
                </Box>
            </Box>
          </Box>
          <Box sx={{borderTop:"solid",width:{xs:0.9,sm:0.5,md: 0.3}, marginTop:1.5, paddingTop:1.5, textAlign:"left",marginBottom:7,fontSize: "15px"}}>
            {props.descriptions}
          </Box>
          <Box sx={{position: "fixed", bottom: 5}}>
          <ButtonGroup variant="contained" aria-label="outlined success button group">
            <Button color="success">Location</Button>
            <Button color="success">Message</Button>
          </ButtonGroup>
          </Box>
        </>
    )
}