import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SavedPost from "./SavedPost";
import EditProfile from "./EditProfile";
import PastUploads from "./PastUpload";

function UserProfile() {
  return (
    <div className="UserProfile">
      <h1> User Profile Page </h1>


      <Router>
        <main className="Router">
          <Routes>
            {/* a route for the saved post page */}
            <Route path="/SavedPost" element={<SavedPost />} />

            {/* a route for the edit profile page */}
            <Route path = "/EditProfile" element={<EditProfile/>} />

            {/* a route for the messages page */}
            <Route path = "/PastUploads" element={<PastUploads/>} />

          </Routes>
        </main>
      </Router>

    </div>
  );
}

export default UserProfile;


