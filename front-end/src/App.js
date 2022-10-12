import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';


//header and footer added to index


import Homepage from './pages/Homepage';
import UploadItem from './pages/UploadItem';
import UserProfile from './pages/UserProfile';
import Messages from './pages/Messages';



function App() {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            {/* a route for the home page */}
            <Route path="/Homepage" element={<Homepage />} />

            {/* a route for the upload item page */}
            <Route path = "/UploadItem" element={<UploadItem/>} />

            {/* a route for the user profile page */}
            <Route path = "/UserProfile" element={<UserProfile/>} />

            {/* a route for the messages page */}
            <Route path = "/Messages" element={<Messages/>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;