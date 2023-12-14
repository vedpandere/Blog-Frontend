import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { BASE_URL } from '../Helper/helper';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]


function CreatePost() {

  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');

  const [redirect, setRedirect] = useState(false);

  async function createNewPost(event){

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    event.preventDefault();

    // console.log('Data to be sent:', data);
    const response = await fetch(`${BASE_URL}/post`, {
      method: 'POST',
      body: data,
      credentials:'include',
    })
    // console.log('Response:', response);
    if (response.ok){
      enqueueSnackbar('Post Created Successfully!', {variant: 'success', autoHideDuration: 2000 });
      setRedirect(true);
    }else{
      enqueueSnackbar("Error! Post Not Created", {variant: 'error' ,autoHideDuration: 2000});
    }

  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <form className='create-form' onSubmit={createNewPost} >
      <input type='title'
       placeholder='Title'
       value={ title } 
       onChange={event => setTitle(event.target.value) }/>

      <input type='Summary' 
        placeholder='Summary'
        value={ summary } 
        onChange={ event => setSummary(event.target.value) }/>

      <input type='file' 
        onChange={ event => setFiles(event.target.files) }/>

       {/* React Quill as a text Editor*/} 
      <ReactQuill 
      className='react-quill'
        value={content}
        onChange={ newValue => setContent(newValue) }
        modules={modules}
        formats={formats} />

      <button className='create-btn' style={ { marginTop: '5px' } }>Create post</button>
    </form>
  )
}

export default CreatePost