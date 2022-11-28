import * as React from 'react';
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
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import {useParams} from "react-router-dom";
import TextField from '@mui/material/TextField';

export default function EditPost(props){

    // placeholder for userId. will fetch data in the future.
    const userId = "636a9761296699bf91aa3b48";
  
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
    const isLoggedIn = true
    // const [isLoggedIn,setIsLoggedIn] = useState(true);
  
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
    
      async function updatePost(){
        axios.patch(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${postId}`)
        .then(alert("the post is updated"))
        .then(window.location.replace({"/ItemDetails/:":postId}))
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
      },[])

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

      return(
        <>
        <Box sx={{width:{xs:0.9,sm:0.5,md: 0.3}, paddingTop:1}}>
            <ImgCarousel imgList = {itemDetails.images} />  
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
                <TextField label="Title"
                  value={itemDetails.title}
                //   onChange={handleChange} 
                />
                </Box>
                <Box sx={{marginTop:1,wordWrap: "break-word", fontSize: "12px", textAlign:"left", color:"#2596be"}}>
                <TextField label="Location"
                  value={itemDetails.location}
                //   onChange={handleChange} 
                  />
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
          <TextField label="Description"
                  value={itemDetails.description}
                //   onChange={handleChange} 
                  />
          </Box>

          <Box sx={{ m: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Button color="success" href={"/ItemDetails/:"+postId+"/EditPost"} variant="contained">Save Changes</Button>
          <Button color="success" href={"/ItemDetails/:"+postId+"/EditPost"} variant="contained">Revert Changes</Button>
        </Stack>
      </Box>

      </>
  )
}
  