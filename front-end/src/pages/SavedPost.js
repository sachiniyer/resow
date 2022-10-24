import { Link } from "react-router-dom";

import SearchBar from '../components/SearchBar';
import PostCard from '../components/Post';
import axios from "axios";
import { useEffect,useState } from 'react';

function SavedPost(props) {

  const [data, setData] = useState([]);

  useEffect(() => {

    async function fetchData() {

      const result = await axios(
        "https://my.api.mockaroo.com/items/?key=59c3eda0"
      );

      setData(result.data);
    }

    fetchData();
  }, []);

    return (
      <>
      <section className="SavedPost">
        <br></br>
        <SearchBar></SearchBar>
        <br></br>
        { data && data.map((item) => (
          <PostCard 
            key={item.id}  
            info={item}
          />
        ))}
      </section>
    </>
    );
  }

  export default SavedPost