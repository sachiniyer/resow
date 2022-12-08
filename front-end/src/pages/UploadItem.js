import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import ImgCarousel from '../components/carousel/ImgCarousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom"
import { getLocation } from '../components/Location'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
      contrastText: '#fff',
    },
    secondary: {
      light: '#91ff35',
      main: '#76ff03',
      dark: '#52b202',
      contrastText: '#000',
    },
  },
})

function UploadItem() {

  const [carouselPics, setCarouselPics] = useState([])
  const [uploadFiles, setUploadFiles] = useState([]);
  const [userId, setUserId] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    async function checkLoggedIn() {
      const token = localStorage.getItem('token')
      await axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/profile`, {
        headers: {
          Authorization: token
        }
      })
        .then(res => {
          //console.log(res)  //for debugging
          setUserId(res.data.id)
          //setIsLoggedIn(true)
          navigate("/UploadItem")
        }).catch(err => {
          console.log(err)
          navigate("/SignIn")

        })
    }

    checkLoggedIn();

  }, [navigate]);

  function updateStates(file) {
    let reader = new FileReader();

    reader.onload = () => {
      setUploadFiles(uploadFiles => [...uploadFiles, file]);
      setCarouselPics(itemPics => [...itemPics, reader.result])
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
    const d = new Date()
    let i = 0
    for (let file in uploadFiles) {
      data.append('files', uploadFiles[file], d.getTime() + "-" + i);
      i++
    }

    let [longitude, latitude] = getLocation()
    let location = await axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/location?long=${longitude}&lat=${latitude}`)
      .then(res => {
        return res.data.address
      }).catch(err => {
        console.log(err)
        navigate("/SignIn")
      })


    data.append('title', title)
    data.append('description', description)
    data.append('location', location)
    data.append('owner', userId)
    data.append('latitude', latitude)
    data.append('longitude', longitude)

    const url = `${process.env.REACT_APP_SERVER_HOSTNAME}/posts`

    var config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      }
    };

    axios.post(url, data, config)
      .then(function (res) {
        alert('posted')
        window.location.replace("/Map/ItemsList");
      })
      .catch(function (err) {
        console.log('Error:', err)
      });
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 'calc(100vh - 53px)' }}>
        <Box sx={{ height: '120vh', flexGrow: 0, display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
          <h1> Upload Resource</h1>
          <ImgCarousel imgList={carouselPics} />
          <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" sx={{ marginBottom: 2 }}>

            <Button variant="contained" color="success" startIcon={<PhotoCamera />}>
              <form className="form" onSubmit={() => { return false }}>
                <input className="form-control"
                  hidden
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="images"
                  multiple
                  type="file"
                  onChange={handleUpload}
                />
                <label htmlFor="images">
                  Add Image
                </label>
              </form>              
            </Button>

          </Stack>
          <ThemeProvider theme={theme}>
            <TextField fullWidth label="Post Title" id="title" sx={{color: 'success.main'}}/>
            <TextField sx={{color: 'success.main'}}
              fullWidth
              placeholder="Post Description"
              multiline
              rows={4}
              id='description'
            />
          </ThemeProvider>
          

          <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" sx={{ marginBottom: 2 }}>
            <Button sx={{ width: 100 }} href='/' color="success" variant="contained">Discard</Button>
            <Button sx={{ width: 100 }} onClick={postItem} color="success" variant="contained">Post</Button>
          </Stack>

        </Box>
      </Box>
    </>
  );
}

export default UploadItem;


