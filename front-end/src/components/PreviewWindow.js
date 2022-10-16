import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';


export default function PreviewWindow(props) {
  return (
    <Card sx={{ display: 'flex', width:0.9, maxWidth: 200, borderRadius: '5%' }}>
      <CardActionArea>
        <CardMedia 
          style={{ borderBottom: "solid"}}
          component="img"
          height="200"
          image="/resowLogo.png"
          alt="thumbnail"
        />
        <CardContent>
          <Box sx={{display: 'grid', gap: 0, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Box sx={{width:60}}>
                <Avatar sx={{ border: "solid", width: 60, height: 60, marginLeft:-1, marginTop:-1}} alt="thumbnail" src={props.profileURL}/>
                <Box sx={{width:80, wordWrap: "break-word", marginTop: 0, marginLeft:-2, fontSize: "0.1em"}}>
                     {props.sellerName}
                </Box>
            </Box>
            <Box sx={{width:120}}>
                <Box sx={{width:100, wordWrap: "break-word", marginTop: 1, marginLeft:1, fontSize: 1, textAlign:"left"}}>
                    {props.title}
                </Box>
                <Box sx={{ width:100, wordWrap: "break-word", marginTop: 1.5, marginLeft:1, fontSize: 1, textAlign:"left", color:"#2596be"}}>
                    {props.location}
                </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}