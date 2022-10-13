import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Message(props) {

  return (
    <Card sx={{
      display: "flex",
      width: { xs: 0.9, sm: 0.75, md: 0.5 }
    }} >
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 100, md: 150 },
          maxWidth: { xs: 100, md: 150 },
          mt: "auto",
          mb: "auto",
        }}
        alt="Image of the good"
        src={props.img}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 1, align: "right" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{ display: 'grid', gap: 0, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Typography component="div" variant="body1" align="left">
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
