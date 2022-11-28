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
import {useParams} from "react-router-dom";

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