import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

import Footer from './components/Footer';

//Main Pages
import Homepage from './pages/Homepage';
import UploadItem from './pages/UploadItem';
import UserProfile from './pages/UserProfile';
import Messages from './pages/Messages';
//Pages accessed from other pages
import ItemsList from './pages/ItemsList'
import ItemDetails from './pages/ItemDetails'
import PastUpload from './pages/PastUpload'
import SavedPost from './pages/SavedPost'
import EditProfile from './pages/EditProfile'
function App() {
  return (
    <div className="App">
      <Footer />
      <main className="App-body">
        <Router>
          <Routes>
            {/* a route for the home page */}
            <Route path="/" element={<Homepage />} />

            {/* a route for the upload item page */}
            <Route path="/UploadItem" element={<UploadItem
              thumbnailURL="/resowLogo.png"
              profileURL="/resowLogo.png"
              sellerName="Foo Barstein"
              title="Cute rabbit needs a new home"
              location="400 Broome St"
              descriptions="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " />} />

            {/* a route for the user profile page */}
            <Route path="/UserProfile" element={<UserProfile fullname="Foo Bar" email="foobar@school.edu" username="foobar1" tel="+9711234567" location="New York, USA" />} />

            {/* a route for the messages page */}
            <Route path="/Messages" element={<Messages />} />

            {/* a route for the items list page */}
            <Route path="/Map/ItemsList" element={<ItemsList />} />

            {/* a route for the items list page */}
            <Route path="/ItemDetails" element={<ItemDetails
              thumbnailURL="/resowLogo.png"
              profileURL="/resowLogo.png"
              sellerName="Foo Barstein"
              title="Cute rabbit needs a new home"
              location="400 Broome St"
              descriptions="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " />}
            />

            {/* a route for the edit profile page */}
            <Route path="/UserProfile/EditProfile" element={<EditProfile />} />

            {/* a route for the saved post page */}
            <Route path="/UserProfile/SavedPost" element={<SavedPost />} />

            {/* a route for the past upload page */}
            <Route path="/PastUpload" element={<PastUpload />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
