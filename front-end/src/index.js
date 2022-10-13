import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './components/Header'
import Footer from './components/Footer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Homepage from './pages/Homepage';
import UploadItem from './pages/UploadItem';
import UserProfile from './pages/UserProfile';
import Messages from './pages/Messages';


import ItemList from './pages/ItemsList';
import ItemDetails from './pages/ItemDetails';
import PastUploads from './pages/PastUpload';
import SavedPost from './pages/SavedPost';
import ChatPage from './pages/ChatPage';  //must be fixed later



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App />
    <Router>
      <main className="Router">
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
      <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
