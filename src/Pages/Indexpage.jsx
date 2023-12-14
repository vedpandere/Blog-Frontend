import React, { useEffect, useState } from 'react'
import Post from '../Components/Post';
import { BASE_URL } from '../Helper/helper';

export default function IndexPage() {
  
  // We will define a array get the data from database and insert it in array
  // and we will use map to show
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    fetch(`${BASE_URL}/post`).then( response => {
      response.json().then( posts => {
        // console.log("posts", posts);
        setPosts(posts);
      });
    });
  }, []);
  // console.log("Post IndexPage : ", posts);

  return (
    <div>

    { posts.length > 0 && posts.map( post => {
        // We use spread operator to get all information
        return <Post {...post} />
      })
    }
    </div>
  )
}

// export default Indexpage