import './App.css';
import MessageCard from './components/Message'
import PostCard from './components/Post'
import PreviewWindow from './components/PreviewWindow';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-body">
        <SearchBar></SearchBar>
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
