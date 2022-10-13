import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';


import Homepage from './pages/Homepage';
import UploadItem from './pages/UploadItem';
import UserProfile from './pages/UserProfile';
import Messages from './pages/Messages';


import ItemList from './pages/ItemsList';
import ItemDetails from './pages/ItemDetails';
import PastUploads from './pages/PastUpload';
import SavedPost from './pages/SavedPost';
import ChatPage from './pages/ChatPage';  //must be fixed later




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

            {/* a route for the list page */}
            <Route path = "/ItemsList" element={<ItemList/>} />

            {/* a route for the item details page */}
            <Route path = "/ItemsDetails" element={<ItemDetails/>} />

            {/* a route for the past upload page */}
            <Route path = "/PastUploads" element={<PastUploads/>} /> 

            {/* a route for the saved post page */}
            <Route path = "/SavedPost" element={<SavedPost/>} />

            {/* a route for the chat inbox page */}
            <Route path = "/User?ChatInbox" element={<ChatPage/>} />

          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;