import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ImgCarousel from '../components/carousel/ImgCarousel';
import ContactBox from '../components/ContactBox';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AspectRatio from '@mui/joy/AspectRatio';
import axios from "axios";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';

export default function EditPost(props) {

  const [userId, setUserId] = useState("")

  const navigate = useNavigate()

  // The postId obtained from the parameter.
  let { id } = useParams();
  const postId = { id }.id;

  // The item details which contains all the information about the post.
  const [itemDetails, setItemDetails] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([""]);

  // The upload details which contains all the information about the user.
  const [uploaderId, setUploaderId] = useState();
  const [uploaderDetails, setUploaderDetails] = useState({});

  // The path to the profile image of the uploader
  const [imgPath, setImgPath] = useState();

  async function updatePost() {
    // axios.patch(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${postId}`)
    // .then(alert("the post is updated"))
    // .then(window.location.replace({"/ItemDetails/:":postId}))
    // .catch(err => {console.log(err)})

    const postInfo = {
      title: `${title}`,
      description: `${description}`
    }

    axios.patch(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${postId}`, postInfo)
      .then(res => {
        if (res.data.message === "ok") {
          alert("the post has been updated")
          console.log(postId)
          window.location.replace(`/ItemDetails/${postId}`)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  async function fetchItemData() {

    const result = await axios(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${postId}`
    );
    setItemDetails(result.data);
    setUploaderId(result.data.owner);
    setTitle(result.title);
    setDescription(result.description);

  }

  async function fetchUploaderData() {
    const result = await axios(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/users/${uploaderId}`
    );
    setUploaderDetails(result.data)
    if (result.data.imgPath) {
      setImgPath(result.data.imgPath)
    }
  }

  useEffect(() => {
    fetchItemData();
    fetchUploaderData();
  }, [uploaderId]);

  const [itemPics, setItemPics] = useState([])

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

  console.log(description)
  return (
    <>
      <Box sx={{ width: { xs: 0.9, sm: 0.5, md: 0.3 }, paddingTop: 1 }}>
        <ImgCarousel imgList={itemDetails.images} />
        {/* <IconButton color="primary" aria-label="upload picture" component="label">
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
          </IconButton> */}
      </Box>

      <Box sx={{ width: { xs: 0.9, sm: 0.5, md: 0.3 }, marginBottom: 2 }}>

        <Box sx={{ width: 1 }}>
          <Box sx={{ height: 0.1 }}>
          </Box>
          
            <TextField 
              fullWidth
              label="Title"
              value={title}
              onChange={event => setTitle(event.target.value)}
              color="success"
            />
   

        </Box>
      </Box>

      <Box sx={{ color: "black", width: { xs: 0.9, sm: 0.5, md: 0.3 }, textAlign: "left", marginBottom: 4, fontSize: "15px" }}>
        <TextField 
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={event => setDescription(event.target.value)}
          color="success"
        />
      </Box>

      <Box sx={{ m: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Button color="success" href={"/ItemDetails/" + postId} variant="contained">Revert Changes</Button>
          <Button color="success" onClick={updatePost} href={"/ItemDetails/" + postId} variant="contained">Save Changes</Button>
        </Stack>
      </Box>

    </>
  )
}
