import * as React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios";
import ImgCarousel from '../components/carousel/ImgCarousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';


function UploadItem() {

  const [carouselPics, setCarouselPics] = useState([])
  const [uploadFiles, setUploadFiles] = useState([]);

  function updateStates(file) {
    console.log('uploadFiles:', uploadFiles)
    let reader = new FileReader();
  
    reader.onload = () => {
      console.log('done loading')
      setUploadFiles(uploadFiles => [...uploadFiles, file]);
      setCarouselPics(itemPics => [...itemPics, reader.result])
      console.log('itemPics:', carouselPics)
    };

    reader.readAsDataURL(file);
  }
  
  async function handleUpload(event) {
    if (event.target.files[0]) {
      let files = event.target.files
      Object.values(files).forEach(updateStates);      
    } 
  }

  async function postItem() {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    const data = new FormData();
    console.log('uploadFiles:', uploadFiles)
    for (let file in uploadFiles) {
      data.append('files', uploadFiles[file]);
    }

    data.append('title', title)
    data.append('description', description)
    data.append('location', "60 Washington Sq, New York, NY 10012")
    data.append('owner', 'Andy Hammy')
    data.append('latitude', '30.2')
    data.append('longitude', '25.4')

    const url = `${process.env.REACT_APP_SERVER_HOSTNAME}/posts`

    var config = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      }
    };

    axios.post(url, data, config)
      .then(function (res) {
        alert('posted')
        //document.location.href = '/PastUpload';
      })
      .catch(function (err) {
        console.log('Error:', err)
      });
  }

  return (
    <>
    <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 'calc(100vh - 53px)' }}>
      <Box sx={{ height: '120vh', flexGrow: 0, display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2}}>
        <h1> Upload Resource</h1>
        <ImgCarousel imgList={carouselPics}/>  
        <IconButton color="primary" aria-label="upload picture" component="label">
          <form role="form" class="form" onsubmit="return false;">
            <input class="form-control"
              hidden
              accept="image/*"
              style={{ display: 'none' }}
              id="images"
              multiple
              type="file"
              onChange={handleUpload}
            />
            <label htmlFor="images">
              <PhotoCamera />
            </label>    
          </form>
        </IconButton>

        
        <TextField fullWidth label="Post Title" id="title" />
        <TextField
          fullWidth
          placeholder="Post Description"
          multiline
          rows={4}
          id='description'
        />

        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" sx={{ marginBottom: 2}}>
          <Button sx={{ width: 100}} href='/' color="success" variant="contained">Discard</Button>
          <Button sx={{ width: 100}} onClick={postItem} color="success" variant="contained">Post</Button>
        </Stack>

      </Box>
    </Box>
    </>
  );
}

export default UploadItem;


