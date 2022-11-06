import * as React from 'react';
import { useEffect,useState } from 'react';
import ImgCarousel from '../components/carousel/ImgCarousel';
import ContactBox from '../components/ContactBox';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AspectRatio from '@mui/joy/AspectRatio';
import axios from "axios";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';


export default function ItemDetails({match}){

  // placeholder for userId. will fetch data in the future.
  const userId = 1;

  // The postId obtained from the parameter.
  const postId = match;

  // The item details which contains all the information about the post. 
  const [itemDetails,setItemDetails] = useState({});

  // placeholder for saveid. will fetch data in the future. 
  const [saveId,setSaveId] = useState(2);  

  // a boolean flag to check if the user opened the contact info box
  const [open, setOpen] = useState(false);

  // a boolean flag to check if the post is the post uploaded by the user
  const [isMyPost,setIsMyPost] = useState(false);

  // a boolean flag to check if a user has logged in or not. (need passport authentication)
  const [isLoggedIn,setIsLoggedIn] = useState(true);

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
    let user_id = 1;
    let post_id = postId;
    let data = {user_id:user_id, post_id:post_id};

    axios
    .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/item/save`,data)
    .then(response => {
      console.log(response.data.message)
      setSaveId(response.data.id)
    })
    .catch (err => {console.log(err)})
  }

  // a function to send save info to the server
  async function unsavePost() {

    axios
    .delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/item/save/${saveId}`)
    .then(response =>{
      console.log(response.data.message)
    })
    .catch(err =>{console.log(err)})

  }

  async function deletePost(){

    axios.delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/item/${saveId}`)
    .then(response =>{
      console.log(response.data.message)
    })
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

  async function fetchData() {

    const result = await axios(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/item/${postId}`
    );
    setItemDetails(result.data);
    setIsMyPost(itemDetails.sellerId === userId)
    // note: the request which checks the "ifMyPost" should be added after the db is implemented
  }

  useEffect(() => {
    fetchData();
  }, []);

  return(
      <>
      <Box sx={{width:{xs:0.9,sm:0.5,md: 0.3}, paddingTop:1}}>
          <ImgCarousel imgList = {itemDetails.imgList}/>  
      </Box>

      <Box sx={{width:{xs:0.9,sm:0.5,md: 0.3}, display: 'flex',borderBottom:"solid"}}>
          <Box sx={{width:0.3,height:1,textAlign:"center",justifyContent:"center"}}>
              <AspectRatio ratio="1/1"> 
                <Avatar sx={{border:"solid 0.5px",borderColor:"black",justifyContent:"center",width: 0.5}} alt="thumbnail" src={itemDetails.profileURL}/> 
              </AspectRatio>
              <Box sx={{width:1, wordWrap: "break-word",fontSize: "10px",color:"black"}}>
                {itemDetails.sellerName}
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
        
        {open ? (<ContactBox info={itemDetails}/>) : null}
        <Box sx={{color:"black",borderTop:"solid",width:{xs:0.9,sm:0.5,md: 0.3}, textAlign:"left",marginBottom:7,fontSize: "15px"}}>
        <Box sx={{textAlign:"right",marginTop:"-35px",marginBottom:"10px"}}>
          {isSaved
          ? <IconButton onClick={switchSaved}><TurnedInIcon/></IconButton>
          : <IconButton onClick={switchSaved}><TurnedInNotIcon/></IconButton>
          }
        </Box>
          {itemDetails.descriptions}
        </Box>

        {isMyPost
        ? <Box sx={{position: "fixed",bottom: 20}}>
            <Button onClick={deletePost} color="success" variant="contained"> Delete post</Button>
          </Box>
          
        : <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{position: "fixed",bottom: 20}}>
              <Button onClick={handleClick} color="success" variant="contained"> Contact info</Button>
            </Box>
          </ClickAwayListener>
        } 

      </>
  )
}