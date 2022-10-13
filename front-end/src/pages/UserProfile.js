import { Link } from "react-router-dom";


function UserProfile() {
  return (
    <div className="UserProfile">
      <h1> User Profile Page </h1>

      <Link to ="/PastUpload"> PastUpload </Link>
      <Link to ="/UserProfile/SavedPost"> SavedPost </Link>

    </div>
  );
}

export default UserProfile;


