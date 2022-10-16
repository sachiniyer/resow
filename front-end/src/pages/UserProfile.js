import { Link } from "react-router-dom";


function UserProfile() {
  return (
    <div className="UserProfile">
      <h1> User Profile Page </h1>
      <ul>
        <li> <Link to ="/PastUpload"> PastUpload </Link> </li>
        <li> <Link to ="/UserProfile/SavedPost"> SavedPost </Link> </li>
        <li> <Link to ="/UserProfile/EditProfile"> Edit Profile </Link> </li>
      </ul>
    </div>
  );
}

export default UserProfile;


