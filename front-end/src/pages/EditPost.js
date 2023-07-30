import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ImgCarousel from '../components/carousel/ImgCarousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';

function EditPost(props) {

  const navigate = useNavigate()
  let { id } = useParams();
  const postId = { id }.id;
  const [itemDetails, setItemDetails] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function updatePost() {
    const postInfo = {
      title: `${title}`,
      description: `${description}`
    }
    axios.patch(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${postId}`, postInfo)
      .then(res => {
        if (res.status === 200) {
          alert("the post has been updated")
          console.log(postId)
          window.location.replace(`/ItemDetails/${postId}`)
        }
        else console.log(res)
      })
      .catch(err => {
        console.log(err);
      })
  }


  useEffect(() => {
    async function fetchItemData() {

      const result = await axios(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${postId}`
      );
      setItemDetails(result.data);
      setTitle(result.data.title);
      setDescription(result.data.description);

    }

    fetchItemData();
  }, [navigate, postId]);


  return (
    <>
      <Box sx={{ width: { xs: 0.9, sm: 0.5, md: 0.3, marginTop: '4vh' } }}>
        <ImgCarousel imgList={itemDetails.images} />
      </Box>

      <Box sx={{ width: { xs: 0.9, sm: 0.5, md: 0.3 }, marginBottom: 2 }}>

        <Box sx={{ width: 1 }}>
          <Box sx={{ height: 0.1 }}>
          </Box>

          <TextField
            fullWidth
            placeholder="Title"
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
          placeholder="Description"
          value={description}
          onChange={event => setDescription(event.target.value)}
          color="success"
        />
      </Box>

      <Box sx={{ m: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Button color="success" href={"/ItemDetails/" + postId} variant="contained">Revert Changes</Button>
          <Button color="success" onClick={updatePost} variant="contained">Save Changes</Button>
        </Stack>
      </Box>

    </>
  )
}

export default EditPost
