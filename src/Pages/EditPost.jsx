import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { BASE_URL } from '../Helper/helper';
import {BiEdit} from 'react-icons/bi';


const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

function EditPost() {

  const { enqueueSnackbar } = useSnackbar();

  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect( () => {
    // We will take the information of post by fetch
    // then we take that information into json and then we will put everything on their field
    fetch(`${BASE_URL}/post/` + id)
    .then( response => {
        response.json().then( postInfo => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
            // setFiles(postInfo.files);
        }) ;
    })
  }, []);

  async function updatePost(event){

    event.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if( files?.[0]) {
        data.set('file', files?.[0]);
    }
    // console.log('Token in cookies:', document.cookie);
    try{

    const response = await fetch(`${BASE_URL}/post`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
        
    })
    // console.log('Response:', response);

    if (response.ok){
      enqueueSnackbar('Post Updated Successfully!', {variant: 'success', autoHideDuration: 2000 });
      setRedirect(true);
    }else{
      enqueueSnackbar("Error! Post Not Updated", {variant: 'error' ,autoHideDuration: 2000});
    }
  }
  catch (error) {
    console.error('Error updating post:', error);
    enqueueSnackbar(`Error! Post Not Updated: ${error.message}`, { variant: 'error' ,autoHideDuration: 2000});
  }

  }

  if(redirect){
    return <Navigate to={'/post/' + id}  />
  }

  return (
    <form className='create-form' onSubmit={updatePost} >
    <input type='file' 
    onChange={ event => setFiles(event.target.files) }/>

      <input type='title'
       placeholder='Title'
       value={ title } 
       onChange={event => setTitle(event.target.value) }/>

      <input type='Summary' 
        placeholder='Summary'
        value={ summary } 
        onChange={ event => setSummary(event.target.value) }/>

       {/* React Quill as a text Editor*/} 
      <ReactQuill 
        value={content}
        onChange={ newValue => setContent(newValue) }
        modules={modules}
        />

          <button className='edit-btn' style={ { marginTop: '5px' } }>
          <BiEdit />
            Update post
          </button>
      
    </form>
  )
}

export default EditPost