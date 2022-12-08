import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import PostCard from '../components/Post';
import axios from "axios";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function SavedPost(props) {

  const [userId,setUserId] = useState("")

  const [data, setData] = useState([]);

  const [noSavedPost, setNoSavedPost] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      await axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/profile`, {headers: {
        Authorization: token
      }})
      .then(res => {
        setUserId(res.data.id)
      }).catch(err => {
        navigate("/SignIn")
      })
    }
    fetchData();
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/posts/saved-posts/userId=`+userId
      );
      setData(result.data);
      if (data !==null){
        setNoSavedPost(result.data.length===0)
      }
    }
    fetchData();
  }, [userId]);

  return (
    <>
        <Box sx = {{color:"black", fontSize:"40px",margin:"10px"}}>Saved Posts</Box>
        {data && data.map((item) => (
          <PostCard 
            key={item._id}  
            info={item}
          />
        ))}
        {noSavedPost
          ? <Box sx={{marginTop:"100px"}}>
              <Box component="img" sx={{width:{xs:0.9,sm:0.6,md: 0.4},objectFit:"cover"}} alt="thumbnail" src={"/resowLogo.png"}></Box>
              <Box sx = {{color:"black", fontSize:"30px",width:1}}>There are no saved posts yet</Box>
            </Box>
          : null
        }
      <Box sx={{ position: "fixed", bottom: 20 }}>
        <Button component={Link} to="/UserProfile" variant="contained" color="success">Back to Profile</Button>
      </Box>
    </>
  )
}

export default SavedPost