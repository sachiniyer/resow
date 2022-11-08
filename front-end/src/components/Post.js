import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";

export default function PostCard(props) {

  const link = "/ItemDetails/" + props.info._id
  console.log(props.info.title)

  return (
      <Card sx={{
        display: "flex",
        width: { xs: 0.9, sm: 0.75, md: 0.5 },
        margin: 1,
        textDecoration: 'none'
      }}
        component={Link} to={link}
      >
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 100, md: 150 },
            maxWidth: { xs: 100, md: 150 },
            mt: "auto",
            mb: "auto",
            objectFit:"cover"
          }}
          alt="thumbnail"
          src={props.info.images[0]}
        />
        <Box sx={{ width: 1 }}>
          <Box sx={{ height: 0.1 }}></Box>
          <Box sx={{ marginLeft: "1em", width: 0.9, flexWrap: "wrap", wordWrap: "break-word", fontSize: { xs: "15px", sm: "20px", md: "20px" }, textAlign: "left" }}>
            {props.info.title}
          </Box>
          <Box sx={{ height: 0.1 }}></Box>
          <Box sx={{ color: "#2596be", marginLeft: "1em", width: 0.9, flexWrap: "wrap", wordWrap: "break-word", fontSize: { xs: "15px", sm: "20px", md: "20px" }, textAlign: "left" }}>
            {props.info.location}
          </Box>
        </Box>
      </Card >
  );
}
