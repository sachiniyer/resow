import './App.css';
import MessageCard from './components/Message'
import PostCard from './components/Post'

function App() {
  return (
    <div className="App">
      <header className="App-body">
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
      </header>

    </div>
  );
}

export default App;
