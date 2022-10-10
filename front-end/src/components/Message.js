import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Message(props) {

  return (
    <Card sx={{ display: 'flex', width: 0.5 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={props.img}
        alt="some image"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{ display: 'grid', gap: 0, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Typography component="div" variant="h5" align="left">
              {props.name}
            </Typography>
            <Typography component="div" variant="body1" align="right">
              {props.date}
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {props.message}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
