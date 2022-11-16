import * as React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';


export default function PreviewWindow(props) {
  return (
    <Card component={Link} to={props.href} sx={{ display: 'flex', width: 0.9, maxWidth: 200, borderRadius: '5%' }}>
      <CardActionArea>
        <CardMedia
          style={{ borderBottom: "solid 0.7px" }}
          component="img"
          height="200"
          image={props.image}
          alt="thumbnail"
        />
        <CardContent>
          <Box sx={{ display: 'grid', gap: 0, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Box sx={{ width: 60 }}>
              <Avatar sx={{ border: "solid 0.7px", width: 60, height: 60, marginLeft: -1, marginTop: -1 }} alt="thumbnail" src={props.profile} />
              <Box sx={{ width: 80, wordWrap: "break-word", marginTop: 0, marginLeft: -2, fontSize: 10 }}>
                {props.seller}
              </Box>
            </Box>
            <Box sx={{ width: 120 }}>
              <Box sx={{ width: 100, wordWrap: "break-word", marginTop: 1, marginLeft: 1, fontSize: 10, textAlign: "left" }}>
                {props.title}
              </Box>
              <Box sx={{ width: 100, wordWrap: "break-word", marginTop: 1.5, marginLeft: 1, fontSize: 10, textAlign: "left", color: "#2596be" }}>
                {props.location}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
