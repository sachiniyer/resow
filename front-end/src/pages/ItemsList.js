import { Link } from "react-router-dom";

function ItemList() {
    return (
      <div className="ItemList">
          <h1> Item List Page </h1>
          <Link to="/ItemDetails"> Item Details </Link> { /*the link should be done with detail ID later on*/}
      </div>
    );
  }
  
  export default ItemList;
  
  
  