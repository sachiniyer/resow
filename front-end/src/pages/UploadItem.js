import { Link } from "react-router-dom";
import * as React from 'react';
import { useEffect,useState } from 'react';
import ImgCarousel from '../components/carousel/ImgCarousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';



function UploadItem() {

  const [itemPics,setItemPics] = useState([])

  function handleUpload(event) {
    console.log('Event:', event)
    console.log('Event.target:', event.target)
    console.log('Event.target.files:', event.target.files)

    if (event.target.files[0]) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setItemPics([...itemPics, reader.result])
      }
    }
  }

  return (
    <>
      <Box sx={{width:{xs:0.9,sm:0.5,md: 0.3}, paddingTop:1}}>
          <ImgCarousel imgList={itemPics}/>  
      </Box>
      <Box sx={{width:{xs:0.9,sm:0.5,md: 0.3}}}>
          
          <Box>
            <h1> Upload Item Page</h1>
          </Box>

          <Box>
            <IconButton color="primary" aria-label="upload picture" component="label">

            <input
              hidden
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleUpload}
            />
            <label htmlFor="raised-button-file">
              <PhotoCamera />
            </label>    
            </IconButton>
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
      </Box>
      <Box sx={{position: "fixed", bottom: 5}}>
        <ButtonGroup variant="contained" aria-label="outlined success button group">
          <Button href='/' color="success">Discard</Button>
          <Button href='/PastUpload' color="success">Post</Button>
        </ButtonGroup>
      </Box>

    </>
  );
}

/*




<Box sx={{width:300, marginTop:1.5, textAlign:"left",marginLeft:3,marginBottom:7}}>
  {props.descriptions}
</Box>

*/

export default UploadItem;


