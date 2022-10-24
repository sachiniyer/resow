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

  async function postItem() {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let data = {title: title, description: description, photos: itemPics}

    const url = 'https://63532326d0bca53a8ebaecb3.mockapi.io/posts'

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //mode: 'cors', // no-cors, *cors, same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then((response) => response.json())
    .then((data) => console.log('response:',data))
    .then(alert('Posted!'));
  }

  return (
    <>
    <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ height: '90vh', flexGrow: 0, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <h1> Upload Item Page</h1>
        <Box sx={{ marginTop: 2 }}></Box>
        <ImgCarousel imgList={itemPics}/>  

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

        <TextField fullWidth label="Post Title" id="title" />
        <TextField
          fullWidth
          placeholder="Post Description"
          multiline
          rows={3}
          maxRows={5}
          id='description'
        />
      </Box>
      
      <ButtonGroup sx={{ position: 'fixed', justifyContent: 'center', bottom: "2vh", left: "3vw", right: "3vw" }} variant="contained" aria-label="outlined success button group">
          <Button href='/' color="success">Discard</Button>
          <Button onClick={postItem} color="success">Post</Button>
      </ButtonGroup>
    </Box>
    </>
  );
}

export default UploadItem;


