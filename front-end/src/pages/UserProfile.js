import { Link } from "react-router-dom";
import './UserProfile.css';

/*function UserImage(props){
  return(
    <div>
      <img className = "UserImage" src="./images/profilepic.jpeg" alt={props.alt} height = "100px" width = "100px"/> 
    </div>
  )
}*/


function UserProfile(props) {
  return (
    <>
      <div className="UserProfile">

        <div className="Image">
          <img className="ProfilePicture" src = "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
           alt = "userimage"/>
        </div>

        <div className = "UserDetails">
          <p> {props.fullname} </p>
          <p> {props.email} </p>
        
        </div>

        <div className = "Buttons">
          <ul>
            <li> <Link to="/PastUpload"> PastUpload </Link> </li>
            <li> <Link to="/UserProfile/SavedPost"> SavedPost </Link> </li>
            <li> <Link to="/UserProfile/EditProfile"> Edit Profile </Link> </li>
          </ul>
        </div>


        
      </div>
      
      </>


      );
}

export default UserProfile;


