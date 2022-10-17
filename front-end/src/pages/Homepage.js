import { Link } from "react-router-dom";


function Homepage() {
  return (
    <div className="Homepage">
        <h1> Map Page </h1>
        <Link to ="/Map/ItemsList"> List Pages </Link>
    </div>
  );
}

export default Homepage;


