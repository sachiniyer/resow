import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

import Header from './components/Header';
import { getLocation } from './components/Location'

//Main Pages
import Homepage from './pages/Homepage';
import UploadItem from './pages/UploadItem';
import UserProfile from './pages/UserProfile';

//Pages accessed from other pages
import ItemsList from './pages/ItemsList'
import ItemDetails from './pages/ItemDetails'
import PastUpload from './pages/PastUpload'
import SavedPost from './pages/SavedPost'
import EditProfile from './pages/EditProfile'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import EditPost from './pages/EditPost'

function App() {
  getLocation()
  return (
    <div className="App">
      <Header />
      <main className="App-body">
        <Router>
          <Routes>
            {/* a route for the home page */}
            <Route path="/" element={<Homepage />} />

            {/* a route for the home page */}
            <Route path="/UserProfile" element={<UserProfile />} />


            {/* a route for the upload item page */}
            <Route path="/UploadItem" element={<UploadItem/>} />


            {/* a route for the SignIn page */}
            <Route path="/SignIn" element={<SignIn
              logo ="/resowLogo.png" />} />

            {/* a route for the Register page */}
            <Route path="/Register" element={<Register />} />

            {/* a route for the items list page */}
            <Route path="/Map/ItemsList" element={<ItemsList />} />



            {/* a route for the edit profile page */}
            <Route path="/UserProfile/EditProfile" element={<EditProfile
              source="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
              fullname="Foo Bar"
              email="foobar@school.edu"
              username="foobar1"
              tel="+9711234567"
              location="New York, USA" />} />

            {/* a route for the items list page */}
            <Route path="/ItemDetails/:id" element={<ItemDetails />} />

            {/* a route for the edit profile page */}
            <Route path="/UserProfile/EditProfile" element={<EditProfile />} />

            {/* a route for the saved post page */}
            <Route path="/UserProfile/SavedPost" element={<SavedPost />} />

            {/* a route for the past upload page */}
            <Route path="/PastUpload" element={<PastUpload />} />

            {/* a route for the edit post page */}
            <Route path="/ItemDetails/:id/EditPost" element={<EditPost />} />

          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
