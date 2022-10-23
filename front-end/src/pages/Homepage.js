import { Link } from "react-router-dom";
import SearchBar from '../components/SearchBar';


function Homepage() {
  return (
    <>
    <div className="Homepage">
        <h1> Map Page </h1>
        <SearchBar></SearchBar>
        <Link to ="/Map/ItemsList"> List Pages </Link>
    </div>
    </>
  );
}

export default Homepage;


