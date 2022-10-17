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
    <div className="UploadItem">
        <h1> Upload Item Page</h1>
        <Box sx={{marginTop:2}}></Box>
        <ImgCarousel/>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
        <Box sx={{position: "fixed", bottom: 5, marginLeft:9}}>
          <ButtonGroup variant="contained" aria-label="outlined success button group">
            <Button color="success">Discard</Button>
            <Button color="success">Post</Button>
          </ButtonGroup>
        </Box>

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
        
        <Link to ='/PastUpload'> PastUpload</Link>
    </div>
  );
}

/*




<Box sx={{width:300, marginTop:1.5, textAlign:"left",marginLeft:3,marginBottom:7}}>
  {props.descriptions}
</Box>

*/

export default UploadItem;


