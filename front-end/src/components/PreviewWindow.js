import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';


export default function PreviewWindow(props) {
  return (
    <Card sx={{ display: 'flex', width:0.9, maxWidth: 340, borderRadius: '5%' }}>
      <CardActionArea>
        <CardMedia 
          style={{ borderBottom: "solid"}}
          component="img"
          height="345"
          image="/resowLogo.png"
          alt="thumbnail"
        />
        <CardContent>
          <Box sx={{display: 'grid', gap: 0, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Box sx={{ width:103}}>
                <Avatar sx={{ border: "solid", width: 100, height: 100}} alt="thumbnail" src={props.profileURL}/>
                <Box sx={{ width:135, wordWrap: "break-word", marginTop: 0, marginLeft:-2}}>
                    <Typography component="div" variant="body2" align="center">
                     {props.sellerName}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ width:190}}>
                <Box sx={{width:180, wordWrap: "break-word", marginTop: 2, marginLeft:1}}>
                    <Typography variant="body2" align="left" >
                        {props.title}
                    </Typography>
                </Box>
                <Box sx={{  width:180, wordWrap: "break-word", marginTop: 2, marginLeft:1}}>
                    <Typography variant="body2" color="text.secondary" align="left">
                        {props.location}
                    </Typography>
                </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}