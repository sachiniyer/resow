import { Link } from "react-router-dom";
import * as React from 'react';
import ImgCarousel from '../components/carousel/ImgCarousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


function UploadItem() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <h1> Upload Item Page</h1>
        <Box sx={{ marginTop: 2 }}></Box>
        <ImgCarousel />
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
        <Box>
          <TextField fullWidth label="Post Title" id="fullWidth" />
          <TextField
            fullWidth
            placeholder="Post Description"
            multiline
            rows={3}
            maxRows={5}
          />
        </Box>
        <Link to='/PastUpload'> PastUpload</Link>
      </Box>
      <ButtonGroup sx={{ position: 'fixed', justifyContent: 'center', bottom: "2vh", left: "3vw", right: "3vw" }} variant="contained" aria-label="outlined success button group">
        <Button color="success">Discard</Button>
        <Button color="success">Post</Button>
      </ButtonGroup>

    </Box>
  );
}

export default UploadItem;


