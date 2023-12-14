import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import {UserContext} from '../Context/UserContext'
import {BiEdit} from 'react-icons/bi';
import BackButton from '../Components/BackButton';
import { BASE_URL } from '../Helper/helper';
const SinglePostPage = () => {

    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();

    // Taking the id to see if we can edit the post
    const {userInfo} = useContext(UserContext);

    useEffect( () => {
        fetch(`${BASE_URL}/post/${id}`)
        .then( response =>{
            response.json().then (postInfo => {
                setPostInfo(postInfo);
            })
        })
    }, []);

    // console.log("PostInfo : ", postInfo);
    // console.log("UserInfo : ", userInfo.id);
    if (!postInfo) return '';
    // console.log("ID: " ,postInfo._id);

  return (
<>

<div className="flex">

<BackButton />

</div>

    <div className='post-page'>
      
      <div className='image'>
        <img src={`${BASE_URL}/${postInfo.cover}`} alt={postInfo.title} />
      </div>

      { /* Edit Button */}
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <BiEdit className='edit' />
            Edit this post
          </Link>
        </div>
      )}

      <h1>{postInfo.title}</h1>

      <div className='content' dangerouslySetInnerHTML={{ __html: postInfo.content }} />

      {userInfo.id === postInfo.author._id && (
        <div className="delete-btn">
          <Link to={`/post/delete/${postInfo._id}`}>
            Delete
          </Link>
        </div>
      )}


    </div>
</>
  )
}

export default SinglePostPage;