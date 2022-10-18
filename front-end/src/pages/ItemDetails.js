import * as React from 'react';
import ImgCarousel from '../components/carousel/ImgCarousel';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


export default function ItemDetails(props){
    return(
        <>
        <Box sx={{marginTop:2}}></Box>
        <ImgCarousel/>
        <Box sx={{ borderBottom:"solid", paddingBottom: 2, width:350, display: 'grid', columnGap:0, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Box sx={{width:140}}>
                <Avatar sx={{width: 100, height: 100, marginLeft:2.5, marginTop:2}} alt="thumbnail" src={props.profileURL}/>
                <Box sx={{ width:140, wordWrap: "break-word", marginTop: 0, marginLeft:0, fontSize: "0.7em"}}>
                     {props.sellerName}
                </Box>
            </Box>
            <Box sx={{width:210,marginLeft:0}}>
                <Box sx={{width:200, wordWrap: "break-word", marginTop: 3, marginLeft:0, fontSize: "1em", textAlign:"left"}}>
                    {props.title}
                </Box>
                <Box sx={{ width:200, wordWrap: "break-word", marginTop: 1.5, marginLeft:0, fontSize: "0.7em", textAlign:"left", color:"#2596be"}}>
                    {props.location}
                </Box>
            </Box>
          </Box>
          <Box sx={{width:300, marginTop:1.5, textAlign:"left",marginLeft:3,marginBottom:7}}>
            {props.descriptions}
          </Box>
          <Box sx={{position: "fixed", bottom: 5, marginLeft:9}}>
          <ButtonGroup variant="contained" aria-label="outlined success button group">
            <Button color="success">Location</Button>
            <Button color="success">Message</Button>
          </ButtonGroup>
          </Box>
        </>
    )
}