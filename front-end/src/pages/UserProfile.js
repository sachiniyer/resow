import { Link } from "react-router-dom";
import './UserProfile.css';
import userimage from "./images/profilepic.jpeg"


/*function UserImage(props){
  return(
    <div>
      <img className = "UserImage" src="./images/profilepic.jpeg" alt={props.alt} height = "100px" width = "100px"/> 
    </div>
  )
}*/


function UserProfile() {
  return (
    <>
      <div className="UserProfile">

        <div className="Image">
          <img className="ProfilePicture" src = {userimage} alt = "userimage"/>
        </div>

        <ul>
          <li> <Link to="/PastUpload"> PastUpload </Link> </li>
          <li> <Link to="/UserProfile/SavedPost"> SavedPost </Link> </li>
          <li> <Link to="/UserProfile/EditProfile"> Edit Profile </Link> </li>
        </ul>
      </div>
      
      </>


      );
}

export default UserProfile;


