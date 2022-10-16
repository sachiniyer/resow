import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';


import Footer from './components/Footer';
import MessageCard from './components/Message'
import PostCard from './components/Post'
import PreviewWindow from './components/PreviewWindow';


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
import ChatPage from './pages/ChatPage'
import EditProfile from './pages/EditProfile'
function App() {
  return (
    <div className="App">
      <Footer/>
      <header className="App-body">
        <Router>
          <main className="Router">
            <Routes>
              {/* a route for the home page */}
              <Route path="/" element={<Homepage />} />

              {/* a route for the upload item page */}
              <Route path = "/UploadItem" element={<UploadItem/>} />

              {/* a route for the user profile page */}
              <Route path = "/UserProfile" element={<UserProfile/>} />

              {/* a route for the messages page */}
              <Route path = "/Messages" element={<Messages/>} />

              {/* a route for the items list page */}
              <Route path = "/Map/ItemsList" element={<ItemsList/>} />

              {/* a route for the items list page */}
              <Route path = "/ItemDetails" element={<ItemDetails/>} />

              {/* a route for the edit profile page */}
              <Route path = "/UserProfile/EditProfile" element={<EditProfile/>} />

              {/* a route for the saved post page */}
              <Route path = "/UserProfile/SavedPost" element={<SavedPost/>} />

              {/* a route for the past upload page */}
              <Route path = "/PastUpload" element={<PastUpload/>} />

              {/* a route for the past upload page */}
              <Route path = "/User#?ChatInbox" element={<ChatPage/>} />

            </Routes>
          </main>
        </Router>      
        <PostCard
          img="/resowLogo.png"
          postTitle="Post Sample"
          name="user x"
          time="1"
          message="selling my old bunnie rabbits to someone that will care for them deeply"
        />
        <MessageCard
          img="/resowLogo.png"
          name="user x"
          date="mm.dd.yyyy"
          message="when are you coming to pick the bunnie rabbits"
        />
        <PreviewWindow 
          thumbnailURL = "/resowLogo.png"
          profileURL = "/resowLogo.png"
          sellerName = "Foo Barstein"
          title = "Cute rabbit needs a new home"
          location = "400 Broome St"
          
        />
      </header>
    </div>
  );
}

export default App;