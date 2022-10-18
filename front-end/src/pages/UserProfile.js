import { Link } from "react-router-dom";
import './UserProfile.css';

/*function UserImage(props){
  return(
    <div>
      <img className = "UserImage" src="./images/profilepic.jpeg" alt={props.alt} height = "100px" width = "100px"/> 
    </div>
  )
}*/

function AllButtons(props){
  return(
    <div>
      <Link to={props.link}><button className = "ButtonStyle"> {props.text} </button></Link>
    </div>
  )
  
}


function UserProfile(props) {
  return (
    <>
      <div className="UserProfile">

        <div className="TopPart">
          <img className="ProfilePicture" src = "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
           alt = "userimage"/>
           <h2 className="FullName"> {props.fullname} </h2>
           <p className="Username"> @{props.username} </p>
        </div>

        <div className = "UserDetails">
          <p> {props.email} </p>
          <p> Phone Number </p>
          <p>  New York, USA </p>
        </div>

        <div className = "Buttons">
          <AllButtons link = "/UserProfile/EditProfile" text = "Edit Profile"/>
          <AllButtons link = "/PastUpload" text = "Past Uploads" />
          <AllButtons link = "/UserProfile/SavedPost" text = "Saved Posts" />
          <AllButtons link = "/" text = "Sign Out" />
        </div>

      </div>
      
      </>
      );
}

export default UserProfile;


