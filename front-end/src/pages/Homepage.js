import { Link } from "react-router-dom";
import MessageCard from '../components/Message'
import PostCard from '../components/Post'
import PreviewWindow from '../components/PreviewWindow';
import SearchBar from '../components/SearchBar';


function Homepage() {
  return (
    <div className="Homepage">
        <h1> Map Page </h1>
        <SearchBar></SearchBar>
        <Link to ="/Map/ItemsList"> List Pages </Link>
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
    </div>
  );
}

export default Homepage;


