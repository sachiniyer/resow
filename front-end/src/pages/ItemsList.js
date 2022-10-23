import PostCard from '../components/Post';
import { useEffect,useState } from 'react';
import axios from "axios";


function ItemList(props) {

  const [itemList,setItemList] = useState([]);

  async function fetchData() {
    const result = await axios(
      "https://my.api.mockaroo.com/items/?key=59c3eda0"
    );
    setItemList(result.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

    return (
      <>
        {itemList && itemList.map((item) => (
          <PostCard key={item.id} info = {item}/>
        ))}
      </>
    );
  }
  
  export default ItemList;
  
  
  