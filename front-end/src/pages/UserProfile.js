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

        <div className="NameImage">
          <img className="ProfilePicture" src = "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
           alt = "userimage"/>
           <h2> {props.fullname} </h2>
        </div>

        <div className = "UserDetails">
          <p> @{props.username} </p>
          <p> {props.email} </p>
        
        </div>

        <div className = "Buttons">
          <div> <Link to="/UserProfile/EditProfile"><button class> Edit Profile </button></Link> </div>
          <div> <Link to="/PastUpload"><button> Past Uploads </button></Link> </div>
          <div> <Link to="/UserProfile/SavedPost"><button> Saved Posts </button></Link> </div>
        </div>

      </div>
      
      </>
      );
}

export default UserProfile;


