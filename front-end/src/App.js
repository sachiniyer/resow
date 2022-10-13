import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer';


//Pages
import Homepage from './pages/Homepage';
import UploadItem from './pages/UploadItem';
import UserProfile from './pages/UserProfile';
import Messages from './pages/Messages';

function App() {
  return (
    <div className="App">
      <Header />
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

            </Routes>
          </main>
      </Router>
      </header>
      <Footer/>
    </div>
  );
}

export default App;