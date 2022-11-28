import * as React from 'react';
import { useNavigate } from "react-router-dom"
import { useEffect,useState } from 'react';
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
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import {useParams} from "react-router-dom";


export default function ItemDetails(props){

  const [userId,setUserId] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      await axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/profile`, {headers: {
        Authorization: token
      }})
      .then(res => {
        setUserId(res.data.id)
        setIsLoggedIn(true)
      }).catch(err => {
        setUserId("")
      })
    }

    fetchData();

  }, [navigate]);

  // The postId obtained from the parameter.
  let {id} = useParams();
  const postId = {id}.id;

  // The item details which contains all the information about the post. 
  const [itemDetails,setItemDetails] = useState({});

  // The upload details which contains all the information about the user.
  const [uploaderId, setUploaderId] = useState();
  const [uploaderDetails, setUploaderDetails] = useState({});

  // The path to the profile image of the uploader
  const [imgPath, setImgPath] =useState();

  // a boolean flag to check if the user opened the contact info box
  const [open, setOpen] = useState(false);

  // a boolean flag to check if the post is the post uploaded by the user
  const [isMyPost,setIsMyPost] = useState(false);

  // a boolean flag to check if a user has logged in or not. (need passport authentication)
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  // a boolean flag to check if it is saved or not.
  const [isSaved,setIsSaved] = useState(false);

  // a function for alert box
  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }
  
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
  
    return confirmAction;
  };

  const redirect = () =>{
    window.location.replace("/SignIn");
  };
  const cancel= () => {return};
  
  const askRedirect = useConfirm(
    "Please sign in to save the post",
    redirect,
    cancel
  );


  async function savePost(){
    let user_id = userId;
    let post_id = postId;
    let data = {userId:user_id, postId:post_id};

    axios
    .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/saved-posts`,data)
    .catch (err => {console.log(err)})
  }

  // a function to send save info to the server
  async function unsavePost() {

    axios
    .delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/saved-posts/userId=${userId}&postId=${postId}`)
    .catch(err =>{console.log(err)})

  }

  async function deletePost(){

    axios.delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${postId}`)
    .then(alert("the post is deleted"))
    .then(window.location.replace("/Map/ItemsList"))
    .catch(err => {console.log(err)})

  }

  // a switching function to check the state of saving
  const switchSaved = () => {
    if (!isLoggedIn){
      askRedirect();
    }
    else {
      if (isSaved){
        unsavePost();
        setIsSaved(!isSaved);
      }
      else{
        savePost();
        setIsSaved(!isSaved);
      }
    }
  }

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  async function fetchItemData() {

    const result = await axios(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${postId}`
    );
    setItemDetails(result.data);
    setUploaderId(result.data.owner)
    setIsMyPost(result.data.owner === userId)
  }

  async function fetchUploaderData(){
    const result = await axios(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/users/${uploaderId}`
    );
    setUploaderDetails(result.data)
    if(result.data.img){
      setImgPath(result.data.img[0])
    }
  }

  async function checkSave() {

    const result = await axios(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/users/saved-posts/userId=${userId}&postId=${postId}`
    );
    if (result.data.length === 0){
      setIsSaved(false)
    }
    else{
      setIsSaved(true)
    }
  }

  useEffect(() => { 
    fetchItemData();
    fetchUploaderData();
  }, [uploaderId]);

  useEffect(()=>{
    checkSave();
  },[userId])

  return(
      <>
      <Box sx={{width:{xs:0.9,sm:0.5,md: 0.3}, paddingTop:1}}>
          <ImgCarousel imgList = {itemDetails.images} />  
      </Box>

      <Box sx={{width:{xs:0.9,sm:0.5,md: 0.3}, display: 'flex',borderBottom:"solid"}}>
          <Box sx={{width:0.3,height:1,textAlign:"center",justifyContent:"center"}}>
              <AspectRatio ratio="1/1"> 
                <Avatar sx={{border:"solid 0.5px",borderColor:"black",justifyContent:"center",width: 0.5}}  src={imgPath}/> 
              </AspectRatio>
              <Box sx={{width:1, wordWrap: "break-word",fontSize: "10px",color:"black"}}>
                {uploaderDetails.fullname}
              </Box>
          </Box>

          <Box sx={{width:0.05}}>
          </Box>

          <Box sx={{width: 1}}>
              <Box sx={{height:0.1}}>
              </Box>
              <Box sx={{width:1, flexWrap:"wrap", wordWrap: "break-word",fontSize: {xs:"15px",sm:"20px",md: "20px"}, textAlign:"left",color:"black"}}>
                {itemDetails.title}
              </Box>
              <Box sx={{marginTop:1,wordWrap: "break-word", fontSize: "12px", textAlign:"left", color:"#2596be"}}>
                {itemDetails.location}
              </Box>
          </Box>
        </Box>
        
        {open ? (<ContactBox info={uploaderDetails}/>) : null}
        <Box sx={{color:"black",borderTop:"solid",width:{xs:0.9,sm:0.5,md: 0.3}, textAlign:"left",marginBottom:7,fontSize: "15px"}}>
        <Box sx={{textAlign:"right",marginTop:"-35px",marginBottom:"10px"}}>
          {isSaved
          ? <IconButton onClick={switchSaved}><TurnedInIcon/></IconButton>
          : <IconButton onClick={switchSaved}><TurnedInNotIcon/></IconButton>
          }
        </Box>
          {itemDetails.description}
        </Box>

        {isMyPost
        ? <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
        <Button sx={{ width: 100}} onClick={deletePost} color="success" variant="contained">Delete</Button>
        <Button sx={{ width: 100}} href={"/ItemDetails/:"+postId+"/EditPost"} color="success" variant="contained">Edit</Button>
      </Stack> 
        
        // <Box sx={{position: "fixed",bottom: 20}}>
        //     <Button onClick={deletePost} color="success" variant="contained"> Delete post</Button>
        //   </Box>
          
        : <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{position: "fixed",bottom: 20}}>
              <Button onClick={handleClick} color="success" variant="contained"> Contact info</Button>
            </Box>
          </ClickAwayListener>
        } 

      </>
  )
}